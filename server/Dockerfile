FROM node:14.7.0-alpine3.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm","start"]