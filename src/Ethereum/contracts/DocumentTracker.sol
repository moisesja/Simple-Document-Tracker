pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract DocumentTracker {

    string private _documentHashCode;

    // Holds Viewing History
    struct InquiryEntry {
        uint256 InquiryDate;
        address InquirerAddress;
    }

    address public DocumentPublisher;
    InquiryEntry[] public InquiryEntries;

    // Notify that a read was requested
    event DocumentViewRequested(string documentHashCode);

    function stringNotNullNorEmpty(string memory value) private pure returns (bool) {
        bytes memory tempEmptyStringTest = bytes(value); // Uses memory
        return (tempEmptyStringTest.length > 0);
    }

    constructor(string memory documentHashCode) public {

        require(stringNotNullNorEmpty(documentHashCode), 'The Document Hash Code cannot be empty.');
        
        DocumentPublisher = msg.sender;
        _documentHashCode = documentHashCode;

    }

    // This read generates a transaction and thus it is not a straight return
    function getDocumentHashCode() public returns (string memory) {
        
        InquiryEntry memory inquiry = InquiryEntry({
            InquiryDate : block.timestamp,
            InquirerAddress : msg.sender
        });
        
        // This forces the mining of a new block
        InquiryEntries.push(inquiry);
    
        // Return as an event as any transaction can only return a Transaction Receipt
        emit DocumentViewRequested(_documentHashCode);
    }
    
    function getInquiriesCount() public view returns (uint) {
        return InquiryEntries.length;
    }
}