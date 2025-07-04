const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3083;

app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mindcare_stories', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// Define Story Schema
const storySchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  date: { type: String, required: true }
});

// Create Story Model
const Story = mongoose.model('Story', storySchema);

// Routes
// Get all stories
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ date: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Post a new story
app.post('/api/stories', async (req, res) => {
  const { author, content, date } = req.body;
  const newStory = new Story({ author, content, date });

  try {
    await newStory.save();
    res.status(201).json({ message: '✅ Story added successfully!' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to add story' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
