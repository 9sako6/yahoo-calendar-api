FROM mcr.microsoft.com/playwright

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
  && npx playwright install --with-deps

EXPOSE 8080

ENV NODE_ENV=production

COPY dist/server.js dist/server.js

ENTRYPOINT [ "npm", "start" ]
