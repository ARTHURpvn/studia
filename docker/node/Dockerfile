# docker/node/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install --omit=dev

COPY frontend/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]
