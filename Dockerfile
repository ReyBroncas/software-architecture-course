FROM node:14-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

ARG task_num="task1"
ENTRYPOINT ["npm", "run"]
CMD [task_num]
