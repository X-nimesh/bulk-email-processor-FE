
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
# RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=builder /app/deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Move all build files to NGINX serve folder
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
