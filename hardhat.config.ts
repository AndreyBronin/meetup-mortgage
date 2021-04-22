import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config(); // load env vars from .env
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";


import "hardhat-typechain";
import "hardhat-tracer";
import "hardhat-gas-reporter";

const SKIP_LOAD = process.env.SKIP_LOAD === 'true';
const HARDFORK = 'istanbul';
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';

if (!SKIP_LOAD) {
  const tasksPath = path.join(__dirname, 'tasks');
  fs.readdirSync(tasksPath)
    .filter((pth) => pth.includes('.ts'))
    .forEach((task) => {
      require(`${tasksPath}/${task}`);
    });
}

const hardhatConfig: HardhatUserConfig = {
  solidity: "0.7.3",
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  gasReporter: {
    currency: 'USD',
    enabled: true
  },
  networks: {
    hardhat: {
      hardfork: HARDFORK,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
      },
    },
    ganache: {
      url: 'http://localhost:7545',
      accounts: {
        mnemonic: 'stage lock tag major middle area baby grief riot tell sister unaware\n',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  }
};

export default hardhatConfig;


