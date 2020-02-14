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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const viewer = (props) => {

    const classes = useStyles();

    const [documentText, setdocumentText] = React.useState('[empty]');

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const getMetamaskAccount = async () => {

        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      
    }

    const onViewDocument = async () => {

        handleToggle();

        const inquiryingAccount = await getMetamaskAccount();

        // Query the block for the stored hash. This will incurr a transaction fee
        const trxReceipt = await props.documentTracker.getDocumentHashCode({
            from: inquiryingAccount
        });

        // Parse receipt
        const documentHashCode = trxReceipt.logs[0].args.documentHashCode;

        console.log('got hash code from Ethereum', documentHashCode);

        const node = await Ipfs.object.get(documentHashCode)
        
        setdocumentText(nnode.Data.toString());
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
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

viewer.propTypes = {
    documentTracker: PropTypes.object,
    onViewIssued: PropTypes.func
};

export default viewer;