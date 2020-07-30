# Dockerfile (tag: v3)
FROM node:latest

RUN npm install webpack webpack-cli -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3030

CMD npm run start:prod
EXPOSE 3030