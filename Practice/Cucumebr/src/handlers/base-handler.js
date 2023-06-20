const config = require('../config');
const Kafka = require('utilities').Kafka;
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const kafka = new Kafka(
    {kafkaHost: config.kafka.host, kafkaPort: config.kafka.port});
const loggerObj = require('utilities').Logger;
const wait = require('utilities').wait;

class BaseHandler {
  constructor({loggingOptions, serviceName, groupId, topics, autoCommit, autoCommitIntervalMs}) {
    if (env !== 'production') {
      groupId = `${env}-${groupId}`;
    }
    let tracer;
    this.__inProcessMessageCount__ = 0;
    this.__isPaused__ = false;
    this.parallelMessageToProcess = 5;
    this.serviceName = serviceName;
    const logger = loggerObj(loggingOptions || config.loggingOptions);

    const consumer = kafka.initConsumer(
        {groupId, topics, autoCommit, logger, autoCommitIntervalMs});

    this.logger = logger;
    this.kafka = kafka;
    this.consumer = consumer;
    consumer.pause();
    consumer.on('data', async (message) => {
      await this.handleMessage({consumer, message, logger, tracer, autoCommit, groupId, topics});
    });
    process.on('SIGINT',
        this.handleSignal({logger, consumer, topics, groupId}),
    );
    process.on('SIGTERM',
        this.handleSignal({logger, consumer, topics, groupId}),
    );
    process.on('uncaughtException',
        this.handleSignal({logger, consumer, topics, groupId}),
    );
    consumer.on('error', this.handleSignal({logger, consumer, topics, groupId}));
    this.startHttpServer();
  }

  startHttpServer() {
    const http = require('http');
    http.createServer(async (request, response) => {
      response.end('OK');
    }).listen(process.env.NODE_JOB_PORT || 8080);
  }

  async handleMessage({consumer, message, logger, tracer, autoCommit, groupId, topics}) {
    this.__inProcessMessageCount__++;
    message.count = this.__inProcessMessageCount__;
    if (this.__inProcessMessageCount__ >= this.parallelMessageToProcess) {
      consumer.pause();
      this.__isPaused__ = true;
    }
    try {
      logger.info(`Processing message ${this.__inProcessMessageCount__}`);
      await this.performJob(
          {tracer, logger, message, count: this.__inProcessMessageCount__});
    } catch (err) {
      if (err && err.logMessage) {
        logger.error(`${err.message} -> ${err.logMessage}`, err);
      } else {
        logger.error(err.message, err);
      }
    }
    logger.info('Processing message completed');
    if (!autoCommit) {
      consumer.commit(message, function(err) {
        if (err) {
          logger.error('Error commiting message', {message, err, groupId, topics});
        }
      });
    }
    this.__inProcessMessageCount__--;
    if (this.__inProcessMessageCount__ < this.parallelMessageToProcess &&
        this.__isPaused__ && !this.__closing__) {
      consumer.resume();
      this.__isPaused__ = false;
    }
  }

  handleSignal({logger, consumer, groupId, topics}) {
    return async (err) => {
      if (this.handlingSiginal) {
        return;
      }
      this.handlingSiginal = true;
      if (err) {
        logger.error(
            `Got uncaught exception while processing job groupId ${groupId} for topics ${topics.join(',')} `,
            err,
        );
      } else {
        logger.error(`Got uncaught exception while processing job groupId ${groupId} for topics ${topics.join(',')} `);
      }
      this.__closing__ = true;
      try {
        consumer.close(async () => {
          setTimeout(() => {
            this.__inProcessMessageCount__ = 0;
          }, 60000);
          while (this.__inProcessMessageCount__ > 0) {
            await wait(2000);
          }
          logger.info(`Consumer closed for ${groupId} on ${topics.join(',')}`);
          process.exit(1);
        });
      } catch (e) {
        setTimeout(() => {
          this.__inProcessMessageCount__ = 0;
        }, 60000);
        while (this.__inProcessMessageCount__ > 0) {
          await wait(2000);
        }
        logger.info(`Consumer closed for ${groupId} on ${topics.join(',')}`);
        process.exit(1);
      }
    };
  }

  resumeConsumer() {
    this.consumer.resume();
  }

  // eslint-disable-next-line no-unused-vars
  async performJob({tracer, logger, message}) {
    throw new Error('Please overwrite performJob function in your class');
  }
}

module.exports = BaseHandler;
