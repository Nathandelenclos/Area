FROM node:lts-alpine

ENV MICROSERVICE=api
ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN yarn set version classic && \
    yarn

CMD yarn "$(if [ $NODE_ENV = 'production' ] ; then echo 'start' ; else echo 'start:dev'; fi)" $MICROSERVICE
