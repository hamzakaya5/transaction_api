# ---- Base Node image ----
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# ---- Install dependencies ----
COPY package*.json ./
RUN npm install --production=false

# ---- Build the app ----
COPY . .
RUN npm run build

# ---- Production image ----
FROM node:20-alpine AS prod

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "dist/main.js"]