const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses form data (from HTML forms)

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/contact-form')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Schema and Model
const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to Save Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        // Log data to verify
        console.log('Received Data:', req.body);

        // Validate required fields
        if (!fullName || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields!' });
        }

        const newContact = new Contact({ fullName, email, subject, message });
        await newContact.save();

        res.status(201).json({ message: '✅ Message sent successfully!' });
    } catch (error) {
        console.error('❌ Error saving message:', error.message);
        res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
});

// Start Server
const PORT = 8693;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
