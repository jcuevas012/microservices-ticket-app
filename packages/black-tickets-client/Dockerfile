FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#expose port to the host
EXPOSE  3000

RUN npm run build:next


CMD ["yarn", "run", "start"]