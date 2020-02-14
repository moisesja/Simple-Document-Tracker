/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Ipfs from '../utils/Ipfs';
import web3 from '../utils/Web3';
import ContractDef from '../utils/DocumentTrackerDefinition';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const publisher = (props) => {

    const classes = useStyles();

    const [documentText, setDocumentText] = React.useState('');

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

    const handleDocumentTextChange = (event) => {

        setDocumentText(event.target.value);
    }

    const onPublishDocument = async () => {

        if (documentText !== '') {

            handleToggle();

            // Wrap data
            const obj = {
                Data: new Buffer(documentText)
            }

            // Write to IPFS
            const cid = await Ipfs.object.put(obj)

            // Capture the location, and hash
            // IPFS names the document the same as its hash
            const documentHashCode = cid.toString();

            // Get Current User
            const currentUser = await getMetamaskAccount();

            // Deploy contract and pass-in the hashcode. The deploying account is inferred to be the first one in the accounts list
            const documentTracker = await ContractDef.new(documentHashCode, {
                from: currentUser
            });

            handleClose();

            // Raise Event with new contract
            props.onContractCreated(documentTracker);
        }
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box m={1}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="subtitle1" className={classes.title}>
                            Publisher
                    </Typography>
                    </Toolbar>
                </AppBar>

                <Box m={3}>
                    <form>
                        <div>
                            <TextField id="outlined-multiline-static"
                                label="Enter Document Text"
                                multiline
                                rows="4"
                                variant="outlined"
                                error={documentText.length === 0 ? true : false}
                                helperText={documentText.length === 0 ? 'Enter text before publishing' : ''}
                                onChange={handleDocumentTextChange} />
                        </div>
                        <br />
                        <div>
                            <Button variant="outlined"
                                onClick={onPublishDocument}>Publish</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    );
}

publisher.propTypes = {
    onContractCreated: PropTypes.func.isRequired
};

export default publisher;
