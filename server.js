const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
app.use(express.static('public'));

// Main route - serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for saving/loading wheels (simplified version)
app.use(express.json());

let wheelsDatabase = {};

app.post('/api/save-wheel', (req, res) => {
  const { id, config } = req.body;
  wheelsDatabase[id] = config;
  res.json({ success: true, id });
});

app.get('/api/load-wheel/:id', (req, res) => {
  const wheel = wheelsDatabase[req.params.id];
  if (wheel) {
    res.json({ success: true, config: wheel });
  } else {
    res.status(404).json({ success: false, message: 'Wheel not found' });
  }
});

app.get('/api/wheels', (req, res) => {
  res.json({ wheels: Object.keys(wheelsDatabase) });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Futuristic Wheel running on port ${PORT}`);
  console.log(`👉 Open http://localhost:${PORT} in your browser`);
});
