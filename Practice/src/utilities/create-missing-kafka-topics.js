const config = require('../config');
const KafkaTopic = require('utilities').KafkaTopic;
const lodash = require('lodash');
(async ()=>{
  try {
    const kafkaTopic = new KafkaTopic({kafkaConfig: config.kafka});
    const currentRepoTopics = config.kafka.topics;
    const topicNames = [];
    const topicsToCreate = [];
    let missingTopics;
    // eslint-disable-next-line guard-for-in
    for (const topicKey in currentRepoTopics) {
      topicNames.push(currentRepoTopics[topicKey].topic);
    }
    if (topicNames.length) {
      try {
        await kafkaTopic.checkTopicsExist({topics: topicNames});
      } catch (e) {
        missingTopics = e.topics;
      }
      if (missingTopics) {
        console.info(`Found new topics to create.`, missingTopics);
        let topicObj;
        for (const missingTopic of missingTopics) {
          topicObj = lodash.find(currentRepoTopics, (topicObj) => topicObj.topic === missingTopic);
          topicsToCreate.push({
            topic: missingTopic,
            partition: topicObj.partitionsToCreate || 10,
            replicationFactor: topicObj.replicationFactor || 3,
          });
        }
        await kafkaTopic.createTopics({topics: topicsToCreate});
        console.info(`New topics created.`, topicsToCreate);
      } else {
        console.info(`No new topics to create.`);
      }
    } else {
      console.info(`No topics to create.`);
    }
    process.exit(0);
  } catch (e) {
    console.error(`Error in utility to create topics`, e);
    process.exit(1);
  }
})();
