# Fase de construcción
FROM node:latest as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build --prod

# Fase de despliegue
FROM nginx:alpine
COPY --from=build /app/dist/demo2 /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
