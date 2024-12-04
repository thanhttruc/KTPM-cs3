const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5001;

app.get('/api/gold-price', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8001/api/gold-price');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data from localhost 8001:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});