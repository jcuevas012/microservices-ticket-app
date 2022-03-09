FROM node:alpine

# working directory
WORKDIR /usr/app


#copy package json to install new dependencies
COPY ./package.json ./

RUN yarn install

COPY ./ ./


#expose port to the host
EXPOSE  3000


CMD ["yarn", "run", "dev"]