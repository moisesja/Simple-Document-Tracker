/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Ipfs from '../utils/Ipfs';
import web3 from '../utils/Web3';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    title: {
        flexGrow: 1,
    },
}));

const viewer = (props) => {

    const classes = useStyles();

    const [documentText, setdocumentText] = React.useState('[empty]');

    const getMetamaskAccount = async () => {

        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      
    }

    const onViewDocument = async () => {

        const inquiryingAccount = await getMetamaskAccount();

        // Query the block for the stored hash. This will incurr a transaction fee
        const trxReceipt = await props.documentTracker.getDocumentHashCode({
            from: inquiryingAccount
        });

        // Parse receipt
        const documentHashCode = trxReceipt.logs[0].args.documentHashCode;

        // Get document from IPFS

        /*
        const inquiriesCount = await documentTracker.getInquiriesCount();

        assert.equal(inquiriesCount, 1, 'There should be one inquiries.');

        const inquiryEntry = await documentTracker.InquiryEntries(0);

        console.log('Only inquiry', new Date(inquiryEntry.InquiryDate * 1000), inquiryEntry.InquirerAddress);
        */
       
        // Get hash

        // Get document from IPFS

        // Render it
        setdocumentText('some text');

        // Raise event with number of views
    }

    return (
        <Box m={1}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="subtitle1" className={classes.title}>
                        Viewer
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.documentTracker &&
                <div>
                    <Box m={3}>
                    <Typography variant="subtitle1" gutterbottom>Document Ready
                            
                        </Typography>
                        <Typography variant="h6" gutterbottom>
                            Address: {props.documentTracker.address}
                        </Typography>
                    </Box>
                    <Box m={3}>
                        <form>
                            <div>
                                <Button variant="outlined"
                                    onClick={onViewDocument}>Pay to view document</Button>
                            </div>
                        </form>
                    </Box>
                    <Box m={3}>
                        <Typography variant="subtitle1" gutterbottom>
                            {documentText}
                        </Typography>
                    </Box>
                </div>
            }
        </Box>
    );
}

viewer.propTypes = {
    documentTracker: PropTypes.object.isRequired,
    onViewIssued: PropTypes.func
};

export default viewer;