const express = require('express');
const axios = require('axios');
const promBundle = require('express-prom-bundle');

const app = express();
const PORT = 3009;

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

// Sử dụng middleware để thu thập metrics
app.use(metricsMiddleware);

// Định nghĩa endpoint cho foreign currency
app.get('/api/foreign-currency', async (req, res) => {
    try {
        const response = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching foreign currency data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Tạo một endpoint riêng cho metrics
app.get('/metrics', (req, res) => {
    res.set('Content-Type', metricsMiddleware.getMetricsContentType());
    res.send(metricsMiddleware.getMetrics());
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});