FROM node:alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["tail","-F","Something"]