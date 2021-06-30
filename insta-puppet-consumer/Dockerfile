FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>



COPY . .

RUN apk add git
RUN npm install 

EXPOSE 6000

CMD  ["npm", "run" , "start"]