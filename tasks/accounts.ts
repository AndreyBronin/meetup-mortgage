import { task } from 'hardhat/config';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

task("accounts", "Prints the list of accounts")
  .setAction(async (_, hre) => {

  let admin: SignerWithAddress;
  let greenBank, yellowBank, redBank: SignerWithAddress;
  let otherUsers: SignerWithAddress[];

  [admin, greenBank, yellowBank, redBank, ...otherUsers] = await hre.ethers.getSigners();

  console.log(`Admin address: ${admin.address}`)
  console.log(`GreenBank address: ${greenBank.address}`)
  console.log(`YellowBank address: ${yellowBank.address}`)
  console.log(`RedBank address: ${redBank.address}`)

  return {admin, greenBank, yellowBank, redBank };
});
