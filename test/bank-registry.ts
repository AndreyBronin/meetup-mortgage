import hre, { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Bank, BankRegistry, BankRegistryFactory } from '../types';
import chai from "chai";

chai.use(solidity);
const { expect } = chai;

interface Accounts{admin, greenBank, yellowBank, redBank:SignerWithAddress }

describe("BankRegistry", function() {
  let accounts: Accounts;
  let bankRegistry: BankRegistry;
  let greenBank: Bank;
  let redBank: Bank;

  before(async () => {
    accounts = await hre.run('accounts');

    console.log('==== Deploy Contracts')
    const bankRegistryFactory = (await ethers.getContractFactory("BankRegistry")) as BankRegistryFactory;
    bankRegistry = await bankRegistryFactory.connect(accounts.admin).deploy();
    await bankRegistry.deployed();
    expect(bankRegistry.address).to.properAddress;

    [greenBank, redBank] = await hre.run('deploy:banks');
  });

  it("Should register Bank", async () => {

    const tx = bankRegistry.connect(accounts.greenBank).RegisterOrg('Green Bank', accounts.greenBank.address);

    await expect(tx)
      .to.emit(bankRegistry, 'BankRegistred')
      .withArgs('Green Bank', accounts.greenBank.address);
  });
});
