const initialSetup = require("./initialSetup");

module.exports = transferNft = async (
  fromAccountId,
  toAccountId,
  tokenId,
  serial
) => {
  const client = initialSetup();
  const associateTokenTx = new TokenAssociateTransaction()
    .setAccountId(accountId)
    .setTokenIds([tokenId])
    .freezeWith(client);

  //Sign with the private key of the account that is being associated to a token
  const associateTokenTxSign = await associateTokenTx.sign(accountBCprivateKey);

  //Submit the transaction to a Hedera network
  const associateTokenTxResponse = await associateTokenTxSign.execute(client);

  //Request the receipt of the transaction
  const associateTokenTxReceipt = await associateTokenTxResponse.getReceipt(
    client
  );
};
