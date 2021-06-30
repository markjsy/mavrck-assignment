FROM node:16-alpine

LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

RUN apk add git
WORKDIR /app
COPY . .

RUN npm install -g npx
RUN npx prisma migrate dev
RUN npx prisma db seed --preview-feature
RUN npm install
RUN npm run build


EXPOSE 2000
RUN  cd build
CMD  ["node", "/app/build/index.js" ]