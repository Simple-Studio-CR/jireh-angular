FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build --prod

FROM nginx:1.20-alpine AS prod-satege
COPY --from=build /app/dist/jireh-angular /usr/share/ngix/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]