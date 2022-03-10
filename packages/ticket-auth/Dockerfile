FROM node:16-buster AS deps

# working directory
WORKDIR /usr/src/ticket



#copy package json to install new dependencies

COPY ./package*.json ./lerna.json ./
COPY ./yarn.lock ./
COPY ./packages/ticket-utils/package.json ./packages/utils/
COPY ./packages/ticket-auth/package.json ./packages/ticket-auth/


RUN yarn install

COPY ./packages/ticket-utils ./packages/utils/
COPY ./packages/ticket-auth ./packages/ticket-auth/


#expose port to the host
EXPOSE  3000

CMD ["yarn", "run", "dev", "@ticket-app/auth"]

