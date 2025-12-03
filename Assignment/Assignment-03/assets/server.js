const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Allow your browser (frontend) to call this server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy route: your frontend will call THIS instead of ACNH directly
app.get('/furniture', async (req, res) => {
  try {
    const response = await fetch('https://acnhapi.com/v1a/furniture');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch from ACNH API' });
  }
});

app.listen(3000, () => {
  console.log('🌿 Proxy server running at http://localhost:3000/furniture');
});
