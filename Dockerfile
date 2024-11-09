# Stage 1: Build the app
FROM node:18-bullseye as build

WORKDIR /app

# Install pnpm manually via a shell script (no Rosetta, no corepack)
RUN curl -fsSL https://get.pnpm.io/install.sh | sh - && \
    ln -s /root/.local/share/pnpm/pnpm /usr/local/bin/pnpm

# Ensure the /app directory has write permissions
RUN chown -R node:node /app
USER node

# Copy package files and install dependencies
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the code and build the app
COPY --chown=node:node . .
RUN pnpm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
