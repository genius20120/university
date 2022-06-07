FROM node:14.17.3
WORKDIR /usr/src/app
COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm i
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/app" ]