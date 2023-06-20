FROM node:12-alpine
WORKDIR /Employees
COPY package.json . 
RUN npm i
CMD ["node", "src/index.js"]
EXPOSE 5000