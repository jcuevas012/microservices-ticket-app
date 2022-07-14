# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json  ./

RUN yarn install --frozen-lockfile

COPY . .

#expose port to the host
EXPOSE  3000

RUN yarn run build


CMD ["yarn", "run", "start"]


