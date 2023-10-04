FROM node:18

ENV MICROSERVICE=api

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

CMD yarn start $MICROSERVICE
