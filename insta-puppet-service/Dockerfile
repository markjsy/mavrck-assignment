FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

WORKDIR /app
COPY . .

RUN apk add git
RUN npm install
RUN npm run build
RUN cd build

EXPOSE 2000
CMD  ["node", "/app/build/index.js" ]