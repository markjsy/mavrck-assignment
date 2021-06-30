FROM node:16-alpine
LABEL MAINTAINER Mark Sy <mark.jesse.sy@gmail.com>

WORKDIR /app
COPY . .

RUN apk add git
RUN apk add --no-cache --upgrade bash
RUN chmod a+rx setup.bash
RUN npm install
RUN npm run build

EXPOSE 1000

CMD  ["/app/setup.bash" ]
