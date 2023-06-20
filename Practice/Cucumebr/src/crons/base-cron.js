const config = require('../config');
const loggerObj = require('utilities').Logger;
const wait = require('utilities').wait;
const kafkaService = require('../internal-service-call/kafka-queue');

class BaseCron {
  constructor({loggingOptions, serviceName}) {
    const logger = loggerObj(loggingOptions || config.loggingOptions);
    this.logger = logger;
    this.serviceName = serviceName;

    process.on('SIGINT', this.handleSiginal({logger}));
    process.on('uncaughtException', this.handleSiginal({logger}));
  }

  async initQueue() {
  }

  async enqueueMessage({topic, message, partition, delay, jobId, linkname}) {
    await kafkaService.enqueueMessage({topic, message, partition, delay, jobId, linkname});
  }

  handleSiginal({logger}) {
    return async (err) => {
      if (err) {
        logger.error(`Got uncaught exception while processing cron ${this.serviceName}`, err);
        await wait(2000);
        process.exit(1);
      } else {
        logger.error(`Got signal to exit while processing cron ${this.serviceName}`);
      }
    };
  }

  async start() {
    try {
      await this.performJob({logger: this.logger});
      await wait(2000);
      process.exit(0);
    } catch (e) {
      this.logger.error(`Got error while processing cron ${this.serviceName}`, e);
    }
  }

  async performJob({logger}) {
    logger.error('Please overwrite performJob function in your class');
    throw new Error('Please overwrite performJob function in your class');
  }
}

module.exports = BaseCron;
