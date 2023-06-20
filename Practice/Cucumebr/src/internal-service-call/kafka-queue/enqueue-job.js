module.exports = function makeEnqueueJob({axios, config}) {
  return async function enqueueJob({topic, partition, message, delay, jobId, linkname}) {
    return axios({
      method: 'post',
      url: `${config.serviceEndpoints.kafkaQueue}/v1/enqueue-job`,
      data: {topic, partition, message, delay, jobId, linkname},
    }).then(function(response) {
      if (response.status === 200) {
        return response.data.data;
      } else {
        return false;
      }
    });
  };
};
