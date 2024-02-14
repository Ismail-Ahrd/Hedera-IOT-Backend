const mongoose = require("mongoose");

const connectToDB = async () => {
  const connectionString = process.env.DB_URL;
  await mongoose
    .connect(connectionString, {
      dbName: "Hedera-IOT",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
};

module.exports = connectToDB;
