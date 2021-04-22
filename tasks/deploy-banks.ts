import { task } from 'hardhat/config';
import { Bank, BankFactory } from '../types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

task("deploy:banks", "Deploy bank contracts")
  .setAction(async (_, hre) => {
    let admin: SignerWithAddress;
    let greenAdmin, yellowAdmin, redAdmin: SignerWithAddress;
    let otherUsers: SignerWithAddress[];

    [admin, greenAdmin, yellowAdmin, redAdmin, ...otherUsers] = await hre.ethers.getSigners();

    const deployBank = async (name: string, bankAdmin: SignerWithAddress): Promise<Bank> => {
      console.log(`==== Deploy Bank: ${name} with admin: ${bankAdmin.address}`)

      const factory = (await hre.ethers.getContractFactory("Bank")) as BankFactory;
      const bank = await factory.connect(bankAdmin).deploy(name);
      await bank.deployed();
      return bank;
    }

    const greenBank = await deployBank('GreenBank', greenAdmin);
    await greenBank.GrantManager(otherUsers[0].address);

    const redBank = await deployBank('RedBank', redAdmin);
    await redBank.connect(redAdmin).GrantManager(otherUsers[1].address);

    return [greenBank, redBank]
  });
