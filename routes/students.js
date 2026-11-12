
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

// GET all students - requires a token
// Uses populate() with field selection
router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find()
            .populate('createdBy', 'email role');

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new student - requires a token
router.post('/', requireAuth, async (req, res) => {
    try {
        const newStudent = await Student.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            isActive: req.body.isActive,
            createdBy: req.user.userId
        });

        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update a student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a student - requires a token
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully',
            deletedStudent
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
