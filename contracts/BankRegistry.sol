//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

contract BankRegistry is AccessControl  {
    event BankRegistred(string name, address bank);

    mapping(string => address) banks;


    function RegisterBank(string memory name, address bank) external {
        banks[name] = bank;
        emit BankRegistred(name, bank);
    }

    function GetBankAddress(string name) view public returns (address memory) {
        return banks[name];
    }
}
