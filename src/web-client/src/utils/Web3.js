import Web3 from 'web3';

let web3Provider = null;

// When running on modern dapp browsers
if (window.ethereum) {
    
    web3Provider = window.ethereum;

    try {
        // Request account access
        window.ethereum.enable();        
    }
    catch (error) {
        console.error('User denied account access.');
    }

}
else if (window.web3) {
    web3Provider = window.web3.currentProvider;
}
else
{
    // Fall back to a local instance
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}

const web3 = new Web3(web3Provider);

export default web3;