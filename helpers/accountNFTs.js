const { AccountBalanceQuery } = require("@hashgraph/sdk");

async function showAccountBalance(accountId, client,tokenId){
    const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);     
    const accountBalance = await balanceQuery.execute(client);
    console.log(`The hbar account balance for ${accountId} is ${accountBalance.toJSON().hbars}`); 
   
        console.log(
            `The token account balance with id: ${tokenId} for ${accountId} account is ${accountBalance.tokens.get(tokenId)}`
        );  
    const nfts = accountBalance.tokens.get(tokenId);
    return nfts ;
}
 

module.exports= showAccountBalance ;