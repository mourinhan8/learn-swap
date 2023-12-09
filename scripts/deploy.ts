import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);
    
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy("0xd54D6d5BD983a6cA18F8820f80E0A970FE4A9a8c", "0x65f00a282A58B30f8376D41832d76CeCB7b6186C");
    console.log('Market deployed at: ', auction.address);
    
    Config.setConfig(network + '.Auction', auction.address);

    await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});