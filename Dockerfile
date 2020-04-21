# base image
FROM node:12.9-alpine

# set working directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts -g

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# start app
CMD ["npm", "start"]
