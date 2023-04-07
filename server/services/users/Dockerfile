FROM node:latest

ENV NODE_ENV=production

WORKDIR /users

COPY ["package.json","package-lock.json","./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]