FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>


RUN apk add git

COPY ./package.json ./package.json
COPY ./consumer ./consumer
COPY ./config ./config

EXPOSE 5000

RUN npm install 
CMD  ["npm", "run" , "consumer"]