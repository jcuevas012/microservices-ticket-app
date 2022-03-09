FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#expose port to the host
EXPOSE  3000


CMD ["yarn", "run", "dev"]