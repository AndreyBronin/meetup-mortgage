//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

//struct Org {
//    address Address;
//    string  Name;
//}

contract Bank is AccessControl  {
    event MortgageDocumentReceived(address fromBank, uint256 docId);
    event MortgageDocumentApproved(uint256 docId);
    event MortgageDocumentRejected(uint256 docId);

    string private _name;
    address _registry;
    string private _pk;

    enum DocStatus{ NONE, STORED, RECEIVED, APPROVED, REJECTED }
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    mapping(uint256 => DocStatus) private mortgageDocuments;

    constructor (string memory name_, address registry_) {
        _name = name_;
        _registry = registry_;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function GrantManager(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "AccessControl: admin");

        grantRole(MANAGER_ROLE, account);
    }

//    function SetPublicKey(string memory pk_) external {
//        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "AccessControl: admin");
//        _pk = pk_;
//    }
//
//    function GetPublicKey() external view returns (string memory) {
//        return _pk;
//    }

    function SendMortgageDocumentToBank(address destinationBank, uint256 docId) external {
        require(hasRole(MANAGER_ROLE, _msgSender()), "AccessControl: manager");
        // todo: call destinationBank.StoreDocument(docId)
    }

    function StoreDocument(uint256 docId) external {
        require(mortgageDocuments[docId] == DocStatus.NONE, "document already exist");
        // TODO: require(msg.sender) is a Bank from registry
        mortgageDocuments[docId] = DocStatus.STORED;
    }

    function GetMortgageDocumentState(uint256 docId) external {
        mortgageDocuments[docId] = DocStatus.STORED;
    }

    function ApproveMortgageDocument(uint256 docId) external {
        require(hasRole(MANAGER_ROLE, _msgSender()), "AccessControl: manager");
        emit MortgageDocumentApproved(docId);
    }

    function RejectMortgageDocument(uint256 docId) external {
        require(hasRole(MANAGER_ROLE, _msgSender()), "AccessControl: manager");
        emit MortgageDocumentRejected(docId);
    }
}
