FROM node:alpine

RUN npm install -g create-react-app

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Expose the React app port
EXPOSE 3000

# Command to start the React app
CMD ["npm","run", "start"]