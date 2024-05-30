FROM node:21.7

WORKDIR /pizza-server

COPY package*.json ./

COPY . .

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

CMD ["npm", "start"]