
FROM node:16-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN apk add gettext

RUN yarn build --base-href

FROM nginx:latest

COPY --from=build /app/dist/demo2 /usr/share/nginx/html

EXPOSE 80
