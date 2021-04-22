import { task } from 'hardhat/config';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

task("accounts", "Prints the list of accounts")
  .setAction(async (_, hre) => {

  let admin: SignerWithAddress;
  let greenAdmin, redAdmin: SignerWithAddress;
  let otherUsers: SignerWithAddress[];

  [admin, greenAdmin, redAdmin, ...otherUsers] = await hre.ethers.getSigners();

  console.log(`Admin address: ${admin.address}`)
  console.log(`GreenBank address: ${greenAdmin.address}`)
  console.log(`RedBank address: ${redAdmin.address}`)
});
