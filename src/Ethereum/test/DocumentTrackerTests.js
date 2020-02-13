const DocumentTrackerDef = artifacts.require('./DocumentTracker.sol');

contract('Document Tracker Tests', accounts => {

    beforeEach(async () => {

        documentHashCode = 'This is a heavily guarded secret';

        // Deploy contract and pass-in the hashcode. The deploying account is inferred to be the first one in the accounts list
        documentTracker = await DocumentTrackerDef.new(documentHashCode);
    });

    it('Test Publisher', async () => {

        const publishingAccount = accounts[0];
                
        const documentPublisher = await documentTracker.DocumentPublisher();

        assert.equal(documentPublisher, accounts[0], 'The publisher account must be the same as the deploying account.');
    });

    it('Test Inquiries Count', async () => {

        const publishingAccount = accounts[0];
                
        const inquiriesCount = await documentTracker.getInquiriesCount();

        assert.equal(inquiriesCount, 0, 'There should be no inquiries.');

    });

    it('Test Get Document Hash Code wtih Inquiry Count', async () => {

        const inquiryingAccount = accounts[1];
                
        const trxReceipt = await documentTracker.getDocumentHashCode({
            from: inquiryingAccount
        });

        // Parse receipt
        const returnedHashCode = trxReceipt.logs[0].args.documentHashCode;

        assert.equal(returnedHashCode, documentHashCode, 'Hash Codes Do Not Match');

        const inquiriesCount = await documentTracker.getInquiriesCount();

        assert.equal(inquiriesCount, 1, 'There should be one inquiries.');

        const inquiryEntry = await documentTracker.InquiryEntries(0);

        console.log('Only inquiry', new Date(inquiryEntry.InquiryDate * 1000), inquiryEntry.InquirerAddress);
    });
});