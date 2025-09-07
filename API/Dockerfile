# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install all dependencies (prod + dev)
COPY package*.json ./
RUN npm install --include=dev

# Copy source and build
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS prod

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy build output from build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Use Nest's production script
CMD ["npm", "run", "start:prod"]
