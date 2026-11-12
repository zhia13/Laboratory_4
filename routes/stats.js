
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

// GET student statistics
router.get('/', requireAuth, async (req, res) => {
    try {
        const stats = await Student.aggregate([
            {
                $match: {
                    age: { $exists: true, $ne: null }
                }
            },
            {
                $group: {
                    _id: null,
                    totalStudents: { $sum: 1 },
                    activeStudents: {
                        $sum: {
                            $cond: ['$isActive', 1, 0]
                        }
                    },
                    inactiveStudents: {
                        $sum: {
                            $cond: ['$isActive', 0, 1]
                        }
                    },
                    averageAge: { $avg: '$age' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalStudents: 1,
                    activeStudents: 1,
                    inactiveStudents: 1,
                    averageAge: { $round: ['$averageAge', 2] }
                }
            }
        ]);

        res.json(stats[0] || {
            totalStudents: 0,
            activeStudents: 0,
            inactiveStudents: 0,
            averageAge: 0
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
