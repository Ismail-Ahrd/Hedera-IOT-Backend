const { 
    TokenCreateTransaction, 
    CustomRoyaltyFee, 
    TokenType, 
    TokenSupplyType,
    PrivateKey
} = require("@hashgraph/sdk");
const initialSetup = require("./helpers/initialSetup");

require('dotenv').config();


const createNFT = async (tokenName,tokenSymbol, tokenMemo) => {
    
    const client = initialSetup();
    
    // Define a royalty fee of 5%
    const customFee = new CustomRoyaltyFee()
        .setNumerator(1)
        .setDenominator(20)
        .setFeeCollectorAccountId(client.operatorAccountId)  
    
    let tokenCreateTx = new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTokenMemo(tokenMemo)
        .setTokenType(TokenType.NonFungibleUnique)
        .setMaxTransactionFee(100)
        .setInitialSupply(0)
        .setTreasuryAccountId(client.operatorAccountId)
        .setSupplyType(TokenSupplyType.Infinite)
        .setSupplyKey(client.operatorPublicKey)
        .setCustomFees([customFee])
        .setFeeScheduleKey(client.operatorPublicKey)
        .setAdminKey(client.operatorPublicKey)
        .freezeWith(client);

    const tokenCreateSubmit = await tokenCreateTx.execute(client);
    const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
    const tokenId = tokenCreateRx.tokenId;
    console.log('Create NFT Transaction status: '+ tokenCreateRx.status.toString());
    console.log(`Created NFT collection with ID: ${tokenId}`);
    return tokenId;
}

const main = async () => {
    const tokenId = await createNFT('Device NFT', 'DNFT', 'Device NFT Collection');
}

main();