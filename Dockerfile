FROM node:18-bullseye AS build

WORKDIR /app

RUN npm install -g pnpm@8.0.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18-bullseye

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3005

CMD ["node", "server.js"]
