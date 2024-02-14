const { TokenMintTransaction } = require("@hashgraph/sdk");
const initialSetup = require("./initialSetup");

module.exports = mintNFT = async (tokenId) => {
  const client = initialSetup();

  const tokenMintTx = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from("something")])
    .freezeWith(client);
  const tokenMintSubmit = await tokenMintTx.execute(client);
  const tokenMintReceipt = await tokenMintSubmit.getReceipt(client);
  console.log(
    "Mint NFT Transaction status: " + tokenMintReceipt.status.toString()
  );
  console.log(tokenMintReceipt.serials[0].toString());

  return tokenMintReceipt.serials[0].toString();
};
