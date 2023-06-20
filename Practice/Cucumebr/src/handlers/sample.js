const KafkaConsumer = require('utilities').KafkaConsumer;
const config = require('../config');
const useCases = require('../use-cases');
const loggerObj = require('utilities').Logger;
const logger = loggerObj(config.loggingOptions);

class SampleHandler extends KafkaConsumer {
  constructor() {
    const groupId = 'g1';
    const topics = ['test'];
    const kafkaConfig = config.kafka;
    const parallelMessagesToProcess = 1;

    super({logger, groupId, topics, kafkaConfig, parallelMessagesToProcess});
  }

  async performJob({tracer, message}) {
    logger.info(useCases.greetWelcomeToApp(message.value));
  }
}
module.exports = SampleHandler;

(async () => {
  const sampleHandler = new SampleHandler();
  await sampleHandler.connect();
})();
