# Paso 1: Construir la aplicación Angular en una imagen temporal
FROM node:16.14.0 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Paso 2: Servir la aplicación Angular desde un servidor nginx
FROM nginx:alpine
COPY --from=build /app/dist/demo2 /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
