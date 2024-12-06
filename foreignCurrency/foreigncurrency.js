const express = require('express');
const axios = require('axios');
const client = require('prom-client');
const os = require('os');

const app = express();
const PORT = 3009;

// Tạo một registry để quản lý các metrics
const register = new client.Registry();

// Tạo metric cho số lượng yêu cầu
const requestCounter = new client.Counter({
    name: 'foreign_currency_requests_total',
    help: 'Total number of requests to the foreign currency API',
    registers: [register],
});

// Tạo metric cho tình trạng up/down
const healthGauge = new client.Gauge({
    name: 'foreign_currency_api_health',
    help: 'Health status of the foreign currency API (1 = up, 0 = down)',
    registers: [register],
});

// Tạo metric cho CPU usage
const cpuGauge = new client.Gauge({
    name: 'foreign_currency_cpu_usage',
    help: 'CPU usage in percentage',
    registers: [register],
});

// Tạo metric cho RAM usage
const ramGauge = new client.Gauge({
    name: 'foreign_currency_ram_usage',
    help: 'RAM usage in percentage',
    registers: [register],
});

// Middleware để đếm số lượng yêu cầu
app.use((req, res, next) => {
    requestCounter.inc(); // Tăng số lượng yêu cầu
    next();
});

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

// Endpoint metrics
app.get('/metrics', (req, res) => {
    // Cập nhật health status
    healthGauge.set(1); // Giả sử API đang hoạt động
    // Cập nhật CPU usage
    const cpuUsage = os.loadavg()[0]; // Lấy load average 1 phút
    cpuGauge.set(cpuUsage);
    // Cập nhật RAM usage
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const ramUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
    ramGauge.set(ramUsage);

    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});