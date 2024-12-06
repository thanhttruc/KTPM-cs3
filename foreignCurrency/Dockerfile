# Sử dụng Node.js base image
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY ./foreigncurrency/package*.json ./

# Cài đặt các thư viện
RUN npm install

# Copy các file server vào trong container
COPY ./foreigncurrency .

EXPOSE 3009

# Chạy server
CMD ["sh", "-c", "node foreigncurrency.js"]