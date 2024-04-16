const express = require("express");
require("dotenv").config();
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const connectToDB = require("./db");
const { default: mongoose } = require("mongoose");
const devicesRoute = require("./routes/devices");
const accountsRoute = require("./routes/accounts");
const {
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");
const initialSetup = require("./helpers/initialSetup");

const app = express();
const server = http.createServer(app);

const port = process.env.SERVER_PORT;

connectToDB();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/devices", devicesRoute);
app.use("/accounts", accountsRoute);
app.get("/", (req, res) => {
  res.send("app v1");
});

let interval = null;

app.post("/send-messages", async (req, res) => {
  const topicId = process.env.TOPIC_ID;
  const client = initialSetup();
  // Send message to the topic
  console.log(req.body);
  let submitMsgTx = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: req.body.message || "message",
  }).execute(client);

  let getReceipt = await submitMsgTx.getReceipt(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status;
  console.log(
    "The message transaction status: " + transactionStatus.toString()
  );
  res.send("Message sent.");
});

mongoose.connection.once("open", () => {
  server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  const client = initialSetup();
  const topicId = process.env.TOPIC_ID;

  io.on("connection", (socket) => {
    console.log("A user connected with id: ", socket.id);
    // Subscribe to the topic
    new TopicMessageQuery()
      .setTopicId(topicId)
      .subscribe(client, null, (message) => {
        let messageAsString = Buffer.from(message.contents, "utf8").toString();
        console.log(
          `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
        );
        socket.emit(
          "new-message",
          message.consensusTimestamp.toDate(),
          messageAsString
        );
      });
  });
});

// NFT_COLLECTION_ID
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1);
});
