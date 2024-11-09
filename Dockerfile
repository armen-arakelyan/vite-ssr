# Stage 1: Build the app
FROM --platform=linux/amd64 node:18 as build

WORKDIR /app

# Install pnpm using the recommended installation script
RUN corepack enable && corepack prepare pnpm@8.0.0 --activate

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the app's files and build the app
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
