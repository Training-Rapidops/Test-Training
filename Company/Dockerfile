FROM node:12-alpine
WORKDIR /Company
COPY package.json .
RUN npm i
CMD ["node", "src/index.js"]
EXPOSE 6000