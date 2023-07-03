
FROM node:18-alpine3.16

RUN apk update && apk --no-cache add git curl

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH


COPY package.json .
COPY package-lock.json .
RUN npm install --silent

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
