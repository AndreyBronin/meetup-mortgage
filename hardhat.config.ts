import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config(); // load env vars from .env
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import '@tenderly/hardhat-tenderly';

import "@typechain/hardhat";
import "hardhat-tracer";
import "hardhat-gas-reporter";

const SKIP_LOAD = process.env.SKIP_LOAD === 'true';
const HARDFORK = 'istanbul';
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';
const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY || '';
const TENDERLY_FORK_ID = 'b8b4a90a-6040-4633-b172-1451a88bdbcf';


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
    coinmarketcap: COINMARKETCAP_KEY,
    enabled: true
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT || 'meetup-mortgage',
    username: process.env.TENDERLY_USERNAME || 'andreybronin',
    forkNetwork: '',
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
    tenderly: {
      url: `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`,
      chainId: 3030
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


