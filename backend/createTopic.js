const { TopicCreateTransaction } = require("@hashgraph/sdk");
const initialSetup = require("./helpers/initialSetup");

require("dotenv").config();

const createTopic = async () => {
  const client = initialSetup();
  // Create a new topic
  let txResponse = await new TopicCreateTransaction().execute(client);

  // Grab the newly generated topic ID
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  return topicId;
};

const main = async () => {
  const topicId = await createTopic();
  process.exit();
};

main();
