FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

RUN apk add git
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


EXPOSE 1000
CMD  ["node", "/app/build/index.js" ]