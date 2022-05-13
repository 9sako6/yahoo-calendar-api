FROM node:18.0.0-slim

WORKDIR /redoc

RUN npm install -g redoc-cli
