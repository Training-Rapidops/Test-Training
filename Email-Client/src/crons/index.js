const CronJob = require("cron").CronJob;
const { fetchAndUpdateAccessToken } = require("../Use-Case");

const makeUpdateAccessTokenCron = require("./update-access-token-cron-job");
const updateAccessTokenCron = makeUpdateAccessTokenCron({
  CronJob,
  fetchAndUpdateAccessToken,
});

module.exports = {
  updateAccessTokenCron,
};
