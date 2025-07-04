const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8563;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    message: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// POST route to handle feedback submission
app.post('/feedback', async (req, res) => {
    const { fullname, email, message } = req.body;
    const feedback = new Feedback({ fullname, email, message });
    try {
        await feedback.save();
        res.status(201).send('Feedback submitted successfully');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(400).send('Error submitting feedback');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});