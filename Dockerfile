# Stage 1: Build the app
FROM node:18-bullseye AS build

WORKDIR /app

# Install pnpm via npm instead of using curl and a separate script
RUN npm install -g pnpm@8.0.0

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the code and build the app
COPY . .
RUN pnpm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
