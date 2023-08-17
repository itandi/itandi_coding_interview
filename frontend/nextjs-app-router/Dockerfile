FROM node:18.17.1-buster

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install --frozen-lockfile
