FROM node:18

ENV MICROSERVICE=api
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

CMD yarn "$(if [ $NODE_ENV = 'production' ] ; then echo 'start' ; else echo 'start:dev'; fi)" $MICROSERVICE
