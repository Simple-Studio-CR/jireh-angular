FROM node:16-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

RUN yarn run ng serve

EXPOSE 4200
