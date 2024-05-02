FROM node:16.14.2

WORKDIR /usr/src/app

RUN npm install -g react-scripts

RUN chown -Rh node:node /usr/src/app

USER node

EXPOSE 3000

CMD [ "sh", "-c", "npm install && npm run start" ]