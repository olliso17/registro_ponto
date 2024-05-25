FROM node:latest

WORKDIR /

COPY package*.json ./

COPY . .

CMD ["npm", "start"]