const axios = require('axios');
const config = require('../../config');

const makeEnqueueJob = require('./enqueue-job');
const enqueueJob = makeEnqueueJob({axios, config});

module.exports = {
  enqueueJob,
};
