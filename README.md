
Kiến trúc hệ thống: 
 - Container 1: Chạy một API cung cấp thông tin giá vàng tại Việt Nam, chạy trên cổng 3008, trả về dữ liệu là 
 - Container 2: Chạy một API cung cấp thông tin giá ngoại tệ so với VNĐ, chạy trên cổng 3009.
 - Prometheus: Thu thập các chỉ số từ các container và hệ thống máy chủ (CPU, RAM, băng thông, v.v.).
- Grafana: Hiển thị các dữ liệu thu thập được từ Prometheus thông qua dashboard tùy chỉnh, bao gồm cả tình trạng container và các biểu đồ lưu lượng truy cập.

Các bước kiểm thử và triển khai:
- Bước 1: 
    Tải về các thư viện: npm install

    Khởi động Prometheus và Grafana: docker-compose up -d

    Chạy localhost:  node foreigncurrency.js
                     node goldprice.js



- Bước 2: 
Kiểm tra các API: Truy cập http://localhost:3008/api/gold-price , http://localhost:3008/metrics
 và http://localhost:3009/api/foreign-currency, http://localhost:3009/metrics .

Prometheus: Truy cập tại http://localhost:9090.
Grafana : Truy cập tại http://localhost:4000
 - Bước 3: 


