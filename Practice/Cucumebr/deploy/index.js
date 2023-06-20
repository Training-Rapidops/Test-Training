const _ = require('lodash');
const env = process.env.NODE_ENV;
const region = process.env.REGION;
const services = {};
const serviceConfig = require('./service.json');
const cronConfig = require('./cron.json');
const backgroundJobsConfig = require('./background-jobs.json');
const environmentSpecificConfig = require(`./${env}${(env==='production' || env==='staging')?'/'+region:''}/index.js`);

services.app = _.assign(serviceConfig, environmentSpecificConfig.app);
_.forEach(services.app, (config, appName) =>{
  services.app[appName] = _.assign(config, environmentSpecificConfig.apps[appName]);
  services.app[appName].environmentVariables = _.assign(
      _.cloneDeep(environmentSpecificConfig.commonEnvironmentVariables),
      environmentSpecificConfig.apps[appName].environmentVariables,
  );
  services.app[appName].name = appName;
  services.app[appName].serviceName = config.serviceName;
});

services.cron = cronConfig;
_.forEach(services.cron, (config, cronName) => {
  services.cron[cronName] = _.assign(_.cloneDeep(config), _.cloneDeep(environmentSpecificConfig.crons[cronName]));
  services.cron[cronName].environmentVariables = _.assign(
      _.cloneDeep(environmentSpecificConfig.commonEnvironmentVariables),
      _.cloneDeep(environmentSpecificConfig.crons[cronName].environmentVariables),
  );
  services.cron[cronName].name = cronName;
});

services.backgroundJobs = backgroundJobsConfig;
_.forEach(services.backgroundJobs, (config, jobName) => {
  services.backgroundJobs[jobName] = _.assign(
      _.cloneDeep(config),
      _.cloneDeep(environmentSpecificConfig.backgroundJobs[jobName]),
  );
  services.backgroundJobs[jobName].environmentVariables = _.assign(
      _.cloneDeep(environmentSpecificConfig.commonEnvironmentVariables),
      _.cloneDeep(environmentSpecificConfig.backgroundJobs[jobName].environmentVariables),
  );
  services.backgroundJobs[jobName].name = jobName;
});
module.exports = services;
