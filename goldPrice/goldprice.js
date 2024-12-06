const express = require('express');
const axios = require('axios');
const client = require('prom-client');
const os = require('os');

const app = express();
const PORT = 3008;

// Tạo một registry để quản lý các metrics
const register = new client.Registry();

// Tạo metric cho số lượng yêu cầu
const requestCounter = new client.Counter({
    name: 'gold_price_requests_total',
    help: 'Total number of requests to the gold price API',
    registers: [register],
});

// Tạo metric cho tình trạng up/down
const healthGauge = new client.Gauge({
    name: 'gold_price_api_health',
    help: 'Health status of the gold price API (1 = up, 0 = down)',
    registers: [register],
});

// Tạo metric cho CPU usage
const cpuGauge = new client.Gauge({
    name: 'gold_price_cpu_usage',
    help: 'CPU usage in percentage',
    registers: [register],
});

// Tạo metric cho RAM usage
const ramGauge = new client.Gauge({
    name: 'gold_price_ram_usage',
    help: 'RAM usage in percentage',
    registers: [register],
});

// Middleware để đếm số lượng yêu cầu
app.use((req, res, next) => {
    requestCounter.inc(); // Tăng số lượng yêu cầu
    next();
});

// Định nghĩa endpoint cho gold price
app.get('/api/gold-price', async (req, res) => {
    try {
        const response = await axios.get('http://giavang.doji.vn/api/giavang/?api_key=258fbd2a72ce8481089d88c678e9fe4f');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
        requestCounter.inc();
    } catch (error) {
        console.error('Error fetching gold prices:', error);
        healthGauge.set(0); // Đánh dấu là down khi có lỗi
        res.status(500).send('Error fetching data');
    }
});

// Endpoint metrics
app.get('/metrics', async (req, res) => {
    try {
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
        // Cập nhật băng thông
        const bandwidthUsage = 0; // Tính toán băng thông nếu cần
        bandwidthGauge.set(bandwidthUsage);

        // Lấy metrics và gửi phản hồi
        const metrics = await register.metrics(); // Chờ lấy metrics
        res.set('Content-Type', register.contentType);
        res.send(metrics); // Gửi metrics
    } catch (error) {
        console.error('Error generating metrics:', error);
        res.status(500).send('Error generating metrics');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});