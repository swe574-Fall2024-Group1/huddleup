FROM node:21-alpine as builder
WORKDIR /app
COPY package.json .

RUN npm install yarn -g

COPY yarn*.lock .
RUN yarn install
COPY . .

# Expose the React app port
EXPOSE 3000

# Command to start the React app
CMD ["yarn", "start"]