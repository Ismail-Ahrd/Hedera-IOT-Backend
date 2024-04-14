const Device = require("../models/device");
const mintNFT = require("../helpers/mintNFT");
const AccountNFTs = require("../helpers/accountNFTs");
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({});
    res.send(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.send([]);
  }
};

const getDevicesByAccountId = async (req, res) => {
  try {
    const limit = req.body.limit || 40;
    const tokenId =
      process.env.NFT_COLLECTION_ID || req.body.tokenId || "0.0.3418062";
    const accountId = req.body.accountId || "0.0.3418037";
    const data = await AccountNFTs(accountId, tokenId, limit);
    const nftsFromDb = [];
    for (let i = 0; i < data.nfts.length; i++) {
      const device = await Device.findOne({
        tokenId: tokenId,
        serial: Number(data.nfts[i].serial_number),
      }).exec();

      if (device) nftsFromDb.push(device);
    }
    const number = data.nftsNumber;
    res.json({ nftsFromDb, number });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

const addDevice = async (req, res) => {
  const data = req.body;
  const tokenId = process.env.NFT_COLLECTION_ID;
  const serial = await mintNFT(tokenId);

  const device = new Device({
    tokenId,
    serial,
    ...data,
  });
  await device.save();

  res.status(200).json(device);
};

module.exports = { getDevices, getDevicesByAccountId, addDevice };
