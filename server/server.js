/**
 * Lightweight Express Static Server with Webhook Relay
 * Perfect for hosting on Render, Railway, Heroku, or VPS Node.js runtimes.
 */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Serve all static assets from root directory
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Optional server-side Webhook Relay to bypass browser CORS if needed
app.post('/api/n8n-relay', async (req, res) => {
  const { webhookUrl, payload, authToken } = req.body;

  if (!webhookUrl) {
    return res.status(400).json({ error: 'Missing webhookUrl parameter' });
  }

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = authToken;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const responseData = await response.text();
    return res.status(response.status).send(responseData);
  } catch (error) {
    return res.status(500).json({ error: 'Relay dispatch failed: ' + error.message });
  }
});

// Catch-all route to serve index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🍓 Fruits Emporium server is running on port ${PORT}`);
  console.log(`👉 Access website at: http://localhost:${PORT}`);
});

