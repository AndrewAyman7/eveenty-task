FROM node:20.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

CMD ["node", "dist/app.js"]