# Sử dụng Node.js base image
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt các thư viện
RUN npm install

# Copy các file server vào trong container
COPY . .

# Expose cổng cho server 8000 và 5000
EXPOSE 8000
EXPOSE 5000

# Chạy cả hai server
CMD ["sh", "-c", "node server8000.js & node server5000.js"]