const express = require('express');
const axios = require('axios');
const promBundle = require('express-prom-bundle');

const app = express();
const PORT = 3008;

// Cấu hình middleware metrics
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    buckets: [0.001, 0.01, 0.1, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40, 50, 70, 100, 200],
    customLabels: { model: "No" },
    transformLabels: (labels, req, res) => {
        labels.model = req?.body?.model ?? req?.body?.imageModel ?? req?.body?.voice ?? "No";
        return labels;
    },
});

// Sử dụng middleware
app.use(metricsMiddleware);

// Định nghĩa endpoint cho gold price
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

// Endpoint metrics
app.get('/metrics', (req, res) => {
    res.set('Content-Type', metricsMiddleware.getMetricsContentType());
    res.send(metricsMiddleware.getMetrics());
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
