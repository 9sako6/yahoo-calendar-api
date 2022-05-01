FROM node:18.0.0-slim

RUN npm install -g redoc-cli

COPY openapi/v0/openapi.yaml openapi.yaml
