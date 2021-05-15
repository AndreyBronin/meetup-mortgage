import hre, { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Bank, BankRegistry, BankRegistry__factory } from '../types';
import chai from "chai";

chai.use(solidity);
const { expect } = chai;

interface Accounts {admin, greenAdmin, redAdmin:SignerWithAddress }
interface Banks {
  registry: BankRegistry
  green: Bank;
  red: Bank;
}

describe("Bank suite", function() {
  let admin: SignerWithAddress;
  let greenAdmin, redAdmin: SignerWithAddress;
  let greenManager, redManager: SignerWithAddress;
  let otherUsers: SignerWithAddress[];

  let banks: Banks;

  before(async () => {
    // const accounts = await hre.run('accounts');
    [admin, greenAdmin, redAdmin, greenManager, redManager, ...otherUsers] = await hre.ethers.getSigners();

    banks = await hre.run('deploy:banks');
  });

  it("Should register Banks", async () => {
    const tx = banks.registry.connect(admin).RegisterBank('GreenBank', banks.green.address);
    await expect(tx)
      .to.emit(banks.registry, 'BankRegistred')
      .withArgs('GreenBank', banks.green.address);

    const tx2 = banks.registry.connect(admin).RegisterBank('RedBank', banks.red.address);
    await expect(tx2)
      .to.emit(banks.registry, 'BankRegistred')
      .withArgs('RedBank', banks.red.address);
  });

  it("Should revert document witch already exist", async () => {
    await banks.green.connect(greenAdmin).StoreDocument(1);
    const tx = banks.green.connect(greenAdmin).StoreDocument(1);
    await expect(tx).to.be.reverted;
  });

  it("Should send mortgage document", async () => {
    await banks.green.connect(greenAdmin).StoreDocument(2);
    await banks.red.connect(redManager).ApproveMortgageDocument(2);

  });

  });
