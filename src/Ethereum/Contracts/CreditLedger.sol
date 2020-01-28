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
}