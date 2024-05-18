FROM node:21.7

WORKDIR /pizza-server

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

CMD ["npm", "start"]