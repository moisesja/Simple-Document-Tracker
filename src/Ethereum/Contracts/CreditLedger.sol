pragma solidity ^0.5.16;

contract CreditLedger {

    address public LedgerOwner;
    mapping (uint => LedgerEntry) private _ledgerEntries;
    InquiryEntry[] public InquiryEntries;
    uint private _ledgerEntryCount;

    // Holds the inmutable Credit Entry
    struct LedgerEntry {
        uint Id;
        address CreatorAddress;
        string StorageUri;
        string HashCode;
        uint256 CreatedDate;
    }

    // Holds Viewing Timestamp
    struct InquiryEntry {
        address InquirerAddress;
        uint256 InquiryDate;
        uint LedgerEntryId;
    }
    
    // Owner of Ledger can't write own entries
    modifier cantWriteOwnEntry {
        
        require(msg.sender != LedgerOwner, 'The owner of the ledger cannot set its own reputation.');
        
        _;
    }

    function stringNotNullNorEmpty(string memory value) private pure returns (bool) {
        bytes memory tempEmptyStringTest = bytes(value); // Uses memory
        return (tempEmptyStringTest.length > 0);
    }

    constructor(address ledgerOwner) public {
        LedgerOwner = ledgerOwner;
    }

    function writeEntry(string memory storageUri, string memory hashCode) public cantWriteOwnEntry {

        require(stringNotNullNorEmpty(storageUri), 'A storage URI must be provided.');
        require(stringNotNullNorEmpty(hashCode), 'The document hash code must be provided.');

        LedgerEntry memory entry = LedgerEntry({
            Id : _ledgerEntryCount + 1,
            CreatorAddress : msg.sender,
            StorageUri : storageUri,
            HashCode : hashCode,
            CreatedDate : block.timestamp
        });

        _ledgerEntries[entry.Id] = entry;
        _ledgerEntryCount++;
    }
    
    function readEntry(uint entryId) public returns (uint, address, string memory, string memory, uint256) {
        
        LedgerEntry memory ledgerEntry = _ledgerEntries[entryId];
        
        if (ledgerEntry.Id != 0) {
        
            InquiryEntry memory inquiry = InquiryEntry({
                InquirerAddress : msg.sender,
                InquiryDate : block.timestamp,
                LedgerEntryId : entryId
            });
        
            InquiryEntries.push(inquiry);
        }
        
        return (ledgerEntry.Id, ledgerEntry.CreatorAddress, ledgerEntry.StorageUri, ledgerEntry.HashCode, ledgerEntry.CreatedDate);
    }
    
    function getLedgerEntryCount() public view returns (uint) {
        
        return _ledgerEntryCount;
    }
}
