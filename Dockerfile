FROM node:22.12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.9.0
RUN npm install
COPY ./ .

RUN npm run build

FROM nginx:alpine as production-stage
RUN apk add --upgrade apk-tools
RUn apk upgrade --available
WORKDIR /usr/app

COPY --from=build-stage /app/dist /usr/share/nginx/html/

COPY docker/default.conf /etc/nginx/conf.d/

EXPOSE 80
