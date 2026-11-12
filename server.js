
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const statsRoutes = require('./routes/stats');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

// API Routes
app.use('/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Student Directory API is running!');
});

// Server configuration
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
