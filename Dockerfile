FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add make g++ avahi avahi-dev avahi-compat-libdns_sd && npm install && npm install -g nodemon && apk del make g++
# gcc libc-dev g++ linux-headers dbus
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "nodemon", "--watch . --watch ~/.rfm" ]

