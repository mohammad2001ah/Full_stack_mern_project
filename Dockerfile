# Stage 1: Build the React frontend
FROM node:18-alpine AS build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Setup the Node.js Express server
FROM node:18-alpine

WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/ ./

# Copy built frontend assets to the server's public folder
COPY --from=build /app/client/build ./public

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "index.js"]
