# Stage 1: Build the React frontend
FROM node:18-alpine AS build

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup the Node.js Express server
FROM node:18-alpine

WORKDIR /app/server
COPY server/package*.json ./
# Install production dependencies only
RUN npm install --production

# Copy server code
COPY server/ ./

# Copy built frontend assets to the server's public folder
COPY --from=build /app/client/build ./public

# Ensure the server knows it's running in production so it serves the frontend
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Start the server
CMD ["npm", "start"]
