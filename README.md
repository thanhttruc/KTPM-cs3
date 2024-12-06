# Health Endpoint Monitoring
Một đơn vị cần xây dựng hệ thống giám sát "sức khoẻ" của các services trong hạ tầng của họ. Sử dụng những kiến thức về `Health Endpoint Monitoring` để xây dựng cho mình *một trang web* quản lý nhưng thông tin sau:

 - Tình trạng (up/down) của các container
 - Tình trạng (up/down)  của các endpoint
 - Hiển thị *realtime* các tài nguyên như RAM/Bộ nhớ/Băng thông mạng của máy chủ
 - Xây dựng biểu đồ lưu lượng truy cập.


Kiến trúc hệ thống: 
 - Container 1: Chạy một API cung cấp thông tin giá vàng tại Việt Nam, chạy trên cổng 5000.
 - Container 2: Chạy một API cung cấp thông tin giá ngoại tệ so với VNĐ, chạy trên cổng 8001.
 - Prometheus: Thu thập các chỉ số từ các container và hệ thống máy chủ (CPU, RAM, băng thông, v.v.).
- Grafana: Hiển thị các dữ liệu thu thập được từ Prometheus thông qua dashboard tùy chỉnh, bao gồm cả tình trạng container và các biểu đồ lưu lượng truy cập.

Các bước kiểm thử và triển khai:
- Bước 1: 
    npm install

    docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:ro --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --detach=true --name=cadvisor gcr.io/cadvisor/cadvisor:latest

    docker stats

    foreigncurrency.js
    goldprice.js

    Khởi động Prometheus và Grafana: docker-compose up -d

- Bước 2: 
Kiểm tra các API: Truy cập http://localhost:3009/api/foreign-currency và http://localhost:3008/api/gold-price .

Prometheus: Truy cập tại http://localhost:9090.


