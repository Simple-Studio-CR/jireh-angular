FROM node:10-alpine AS node-base

FROM node-base AS app
WORKDIR /tmp/app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./

FROM node-base AS test
RUN yarn test

FROM app AS build
ENV NODE_ENV production
WORKDIR /tmp/app
RUN yarn build

FROM nginx:stable-alpine AS production
COPY --from=build /tmp/app/dist/demo2/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# HTTPS (certificate not included)
EXPOSE 443
