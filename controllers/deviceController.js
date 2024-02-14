const Device = require("../models/device");

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
    // const tokenId = req.body.tokenId;
    const tokenId = "0.0.3418062";
    const accountId = "0.0.3418037";
    // const accountId = req.body.accountId;

    const nfts = await AccountNFTs(accountId, tokenId);
    res.json(nfts);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

module.exports = { getDevices, getDevicesByAccountId };
