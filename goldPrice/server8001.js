const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8001;

app.get('/api/gold-price', async (req, res) => {
    try {
        const response = await axios.get('http://giavang.doji.vn/api/giavang/?api_key=258fbd2a72ce8481089d88c678e9fe4f');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching gold prices:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});