FROM registry.rapidops.com/salesmate-base
WORKDIR /home/salesmate
ADD ./package.json .
RUN source ./.bash_profile && nvm use 12 && npm install
ADD ./src ./
EXPOSE 8080
CMD ["npm start"]
