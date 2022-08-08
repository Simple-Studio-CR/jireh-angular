FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN yarn install
COPY . .
RUN yarn build --base-href

FROM nginx:stable-alpine AS prod-satege
COPY --from=build /app/dist/demo2 /usr/share/ngix/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
