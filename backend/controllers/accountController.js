const createAccount = require("../helpers/createAccount");

const createNewAccount = async (req, res) => {
  const initialBalance = req.body.initialBalance;
  const accountInfo = await createAccount(initialBalance);

  res.json(accountInfo);
};

const transferDevice = async (req, res) => {
    try {
      const limit = req.body.limit || 20;
      const tokenId = req.body.tokenId || "0.0.3418062";
      const accountId = req.body.accountId || "0.0.3418037";
      const nfts = await AccountNFTs(accountId, tokenId, limit);
      res.json(nfts);
    } catch (error) {
      console.error("Error fetching devices:", error);
      return [];
    }
  };

module.exports = { createNewAccount };
