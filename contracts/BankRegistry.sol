//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

//struct Org {
//    address Address;
//    string  Name;
//}

contract BankRegistry is AccessControl  {
    event BankRegistred(string name, address bankAdmin);

    mapping(address => string) banks;


    function RegisterBank(string memory name, address bankAdmin) external {
        banks[bankAdmin] = name;
        emit BankRegistred(name, bankAdmin);
    }

//    function GetOrgAddress(string name) view public address {
//        return
//    }
}
