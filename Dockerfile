FROM node:16-alpine3.14

WORKDIR /app
COPY package.json .
RUN npm install
COPY index.js .

CMD ["node", "/app/index.js"]