FROM node:18 as build

WORKDIR /app
COPY . /app
RUN yarn set version classic && yarn
RUN yarn run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
