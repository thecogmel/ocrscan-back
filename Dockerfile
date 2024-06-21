FROM node:18-buster-slim

RUN apt-get update && apt-get install -y tesseract-ocr && apt-get install -y libtesseract-dev && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npx prisma generate
COPY prisma ./prisma/

RUN npm run build

COPY ./start_api.sh ./start_api.sh

ENTRYPOINT [ "./start_api.sh" ]

