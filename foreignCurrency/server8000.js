const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8000;

app.get('/api/foreign-currency', async (req, res) => {
    try {
        const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
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