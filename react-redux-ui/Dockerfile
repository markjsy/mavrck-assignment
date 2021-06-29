FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>


RUN apk add git
ADD . / frontend/
RUN (cd frontend/; npm install;)
RUN (npm run build)
 

EXPOSE 3000

CMD  ["npm", "start" , "consumer"]