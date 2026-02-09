require('dotenv').config();
const express = require('express');
const cors = require('cors');
const travelController = require('./src/controllers/travelController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'OffPeak API is running' });
});

// Routes
app.post('/api/analyze', travelController.analyzeDestinations);

app.listen(PORT, () => {
  console.log(`\n🚀 OffPeak Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health\n`);
});