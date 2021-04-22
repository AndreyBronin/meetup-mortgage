//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

//struct Org {
//    address Address;
//    string  Name;
//}

contract Bank is AccessControl  {
    string private _name;
    string private _pk;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");

    constructor (string memory name_) {
        _name = name_;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function GrantManager(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "AccessControl: sender must be an admin to grant");

        grantRole(MANAGER_ROLE, account);
    }

    function SetPublicKey(string memory pk_) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "AccessControl: sender must be an admin to grant");
        _pk = pk_;
    }

    function GetPublicKey() external view returns (string memory) {
        return _pk;
    }
}
