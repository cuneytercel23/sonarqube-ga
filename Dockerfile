# Build stage
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
FROM node:alpine as production
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["node", "./index.js"]
