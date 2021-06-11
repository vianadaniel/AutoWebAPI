FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

RUN npm install

COPY ./build .

EXPOSE 5000

CMD ["node", "server.js"]