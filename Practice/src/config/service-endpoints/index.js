const env=process.env.NODE_ENV?process.env.NODE_ENV:'development';
const serviceEndpoints = require(`./${env}.js`);
module.exports = serviceEndpoints;
