const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import Routes
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes'); // Imported here

const app = express();

// 2. Middleware
app.use(cors()); 
app.use(express.json()); 

// 3. Database Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB via Docker"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// 4. Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes); // Defined here, before the server starts

// Test Route
app.get('/test', (req, res) => {
    res.status(200).json({ message: "Backend is working!" });
});
// Replace app.use(cors()); with this:
app.use(cors({
    origin: 'http://localhost:5173', // or 3000, whatever your React port is
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 5. Start the server (This MUST be the last part)
const PORT = process.env.PORT || 5001; // Using 5001 to avoid Mac port conflicts
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});