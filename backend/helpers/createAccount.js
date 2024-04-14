const {
  AccountCreateTransaction,
  PrivateKey,
  Hbar,
} = require("@hashgraph/sdk");
const initialSetup = require("./initialSetup");

module.exports = createAccount = async (initialBalance) => {
  const client = initialSetup();
  //Create new keys for an account
  const privateKey = PrivateKey.generateED25519();
  const publicKey = privateKey.publicKey;

  const newAccount = await new AccountCreateTransaction()
    .setKey(publicKey)
    .setInitialBalance(Hbar.fromTinybars(initialBalance))
    .execute(client);

  // Get the new account ID
  const getReceipt = await newAccount.getReceipt(client);
  const accountId = getReceipt.accountId.toString();

  //Log the account ID
  return {
    accountId,
    privateKey: privateKey.toString(),
    publicKey: publicKey.toString(),
  };
};
