FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

RUN apk add git
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm install -g serve
RUN npm run build


EXPOSE 5000
CMD  ["serve", "-s" , "build"]