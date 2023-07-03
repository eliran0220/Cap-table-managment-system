
FROM node:18-alpine3.16

RUN apk --no-cache add curl

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install --silent

COPY . .

CMD ["npm", "start"]
