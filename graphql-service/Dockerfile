FROM node:16-alpine
LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

WORKDIR /app
COPY . .

RUN apk add git
RUN npm install
RUN npm run build
RUN npx prisma migrate dev
RUN npx prisma db seed --preview-feature

EXPOSE 1000
CMD  ["node", "/app/build/index.js" ]