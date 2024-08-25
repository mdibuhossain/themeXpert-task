FROM node:alpine

WORKDIR /node-server

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add openssl

RUN apk add --no-cache postgresql-client

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
