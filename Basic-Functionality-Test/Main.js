import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: 'demo',
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getBlockNum() {
    // Access standard Ethers.js JSON-RPC node request
    alchemy.core.getBlockNumber().then(console.log);
}

async function getBinanceTokenBal() {// Access WebSockets and Alchemy-specific WS methods

    // Note - address of Binance Wallet
    // Access Alchemy Enhanced API requests
    alchemy.core.getTokenBalances("0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE").then(console.log);

}

async function getVitalikNFTs() {
    // Note - logs the NFTs of vitalik.eth wallet address.
    // Access the Alchemy NFT API
    alchemy.nft.getNftsForOwner('vitalik.eth').then(console.log);
}


async function getPendingTx() {
    // Note - Listening to pending TX to USDC Contract
    // Access WebSockets and Alchemy-specific WS methods
    alchemy.ws.on(
        {
            method: 'alchemy_pendingTransactions',
            toAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        },
        res => console.log(res)
    );
}

async function getBAYCOwners() {
    // Bored Ape Yacht Club contract address.
    const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

    for await (const nft of alchemy.nft.getNftsForContractIterator(baycAddress, {
        // Omit the NFT metadata for smaller payloads.
        omitMetadata: true,
    })) {
        await alchemy.nft
            .getOwnersForNft(nft.contract.address, nft.tokenId)
            .then((response) =>
                console.log("owners:", response.owners, "tokenId:", nft.tokenId)
            );
    }
}

getBlockNum();
getBinanceTokenBal();
getVitalikNFTs();
getPendingTx();
getBAYCOwners();