const { AccountBalanceQuery } = require("@hashgraph/sdk");
const initialSetup = require("./initialSetup");

async function showAccountBalance(accountId, tokenId) {
  const client = initialSetup();
  const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
  const accountBalance = await balanceQuery.execute(client);

  console.log(
    `The token account balance with id: ${tokenId} for ${accountId} account is ${accountBalance.tokens.get(
      tokenId
    )}`
  );
  const nfts = accountBalance.tokens.get(tokenId);
  console.log("nfts", nfts);
  return nfts;
}

module.exports = showAccountBalance;
