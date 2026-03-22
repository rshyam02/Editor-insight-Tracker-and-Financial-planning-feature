const express = require('express');
const cors = require('cors');
const insightsRoutes = require('./routes/insights');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', insightsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;