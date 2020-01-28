pragma solidity ^0.6.1;

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

    constructor() public {
        LedgerOwner = msg.sender;
    }

    function writeEntry(string memory storageUri, string memory hashCode) public {

        // Validation. Parameters can't be empty
        // Owner of Ledger can't write own entries

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
    
    function readEntry(uint entryId) public returns (uint storage, address storage, string storage, uint256 storage) {
        
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
}