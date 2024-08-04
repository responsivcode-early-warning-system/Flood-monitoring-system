FROM node:20.14-alpine

WORKDIR /app 

COPY package*.json ./
COPY src /app/


RUN npm install 

CMD ["npm", "start"]




