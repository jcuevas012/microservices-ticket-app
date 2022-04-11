FROM node:16-buster AS deps

# working directory
WORKDIR /usr/src/black-tickets


#copy package json to install new dependencies
COPY ./package.json ./lerna.json yarn.lock  ./

COPY ./packages/black-tickets-utils/package.json ./packages/black-tickets-utils/black-tickets-utils/
COPY ./packages/black-tickets-order/package.json ./packages/black-tickets-order/black-tickets-order/

RUN yarn install

COPY ./packages/black-tickets-utils ./packages/black-tickets-utils
COPY ./packages/black-tickets-order ./packages/black-tickets-order


RUN yarn run build

RUN yarn install


#expose port to the host
EXPOSE  3000


CMD ["yarn", "run", "dev"]
# CMD [ "yarn", "run", "dev"]