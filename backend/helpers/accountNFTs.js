const { AccountBalanceQuery } = require("@hashgraph/sdk");
const initialSetup = require("./initialSetup");
const { default: axios } = require("axios");

// async function showAccountBalance(accountId, tokenId) {
//   const client = initialSetup();
//   const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
//   const accountBalance = await balanceQuery.execute(client);
//   console.log(
//     `The token account balance with id: ${tokenId} for ${accountId} account is ${accountBalance.tokens.get(
//       tokenId
//     )}`
//   );
//   const nfts = accountBalance.tokens;
//   console.log("nfts", nfts);
//   return nfts;
// }

async function showAccountBalance(accountId, tokenId, limit) {
  try {
    const data = await axios.get(
      `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts?account.id=${accountId}&limit=${limit}&order=asc`
    );
    const nfts = data.data.nfts;
    const client = initialSetup();
    const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
    const accountBalance = await balanceQuery.execute(client);
    console.log(
      `The token account balance with id: ${tokenId} for ${accountId} account is ${accountBalance.tokens.get(
        tokenId
      )}`
    );
    const nftsNumber = accountBalance.tokens.get(tokenId).toString();

    return { nfts, nftsNumber };
  } catch (err) {
    console.log(err);
    return {};
  }
}
module.exports = showAccountBalance;
