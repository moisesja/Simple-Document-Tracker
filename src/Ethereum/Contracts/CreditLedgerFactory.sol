pragma solidity ^0.5.16;

import "./CreditLedger.sol";

contract CreditLedgerFactory {
    
    address[] private _deployedLedgers;
    
    function registerConsumer() public {
        CreditLedger creditLedger = new CreditLedger(msg.sender);
        _deployedLedgers.push(address(creditLedger));
    }
    
    function getDeployedLedgerContracts() public view returns ( address[] memory ) {
        return _deployedLedgers;
    }
}
