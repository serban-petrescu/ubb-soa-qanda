FROM node:10-alpine AS build

ADD . /code
WORKDIR /code

RUN npm ci

ENV PUBLIC_URL=/app

RUN npm run build

FROM nginx:1-alpine
COPY --from=build /code/build /usr/share/nginx/html