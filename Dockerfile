FROM node:15-alpine

ARG token

ENV GITLAB_YARN_TOKEN=${token}

WORKDIR /app/

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install
