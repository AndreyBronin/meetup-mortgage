//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract FileChannel {
    event FileIsStored(address bankAddress, uint256 fileId);

    function SendDocument() public {
        console.log("document saved");
    }

    function AckDocument() public{}

}
