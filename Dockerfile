FROM node:21-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "serve"]