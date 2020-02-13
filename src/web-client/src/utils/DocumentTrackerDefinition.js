import truffleLib from '@truffle/contract';
import web3 from './Web3';
import contractSymbols from '../contracts/DocumentTracker';

// Use truffle to ingest ABI and Binary Code
const definition = truffleLib(contractSymbols);

// Set association to Metamask
definition.setProvider(web3.currentProvider);

export default definition;