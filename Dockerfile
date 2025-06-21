# Dockerfile
FROM node:20 AS builder

# stage 1: build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# stage 2: serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
