const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.get('/api/foreign-currency', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/api/foreign-currency');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data from localhost 8000:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});