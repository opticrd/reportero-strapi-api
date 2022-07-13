FROM node:16 as release

# Installing libvips-dev for sharp compatability
RUN apt-get update -qq && apt-get install -y libvips-dev
# RUN yarn add @strapi-community/strapi-provider-upload-google-cloud-storage

ARG NODE_ENV=production
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

ENV NODE_ENV=$NODE_ENV
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_USERNAME=$DATABASE_USERNAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

WORKDIR /opt/app
COPY ./package.json ./
COPY ./yarn.lock ./

ENV PATH /opt/app/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g
RUN yarn install

COPY ./ .

RUN yarn build
EXPOSE 1337

CMD NODE_ENV=production; yarn start
