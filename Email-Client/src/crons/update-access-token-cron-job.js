module.exports = function makeUpdateAccessTokenCron({
  CronJob,
  fetchAndUpdateAccessToken,
}) {
  return function updateAccessTokenCron() {
    job = new CronJob("* * * * * *", function () {
      // console.log("cron here");
      fetchAndUpdateAccessToken();
    });
    job.start();
  };
};
