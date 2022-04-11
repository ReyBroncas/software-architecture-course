FROM node:14-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ARG task_num="task1"
ENTRYPOINT ["npm", "run"]
CMD [task_num]
