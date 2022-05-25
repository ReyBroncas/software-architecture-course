FROM node:17-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src /app/src
COPY tsconfig*.json /app/
RUN npm run build

ENTRYPOINT ["npm", "run", "start:dev"]
