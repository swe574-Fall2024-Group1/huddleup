FROM node:alpine

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .

# Expose the React app port
EXPOSE 3000

# Command to start the React app
CMD ["yarn", "start"]