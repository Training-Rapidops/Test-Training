const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require(`./${env}.js`);
console.log(`./${env}.js`);
module.exports = config;
