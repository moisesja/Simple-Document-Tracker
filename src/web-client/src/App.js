import React, { Component }  from 'react';
import Layout from './Layout';

class App extends Component {

  state = {
    quantity: 0,
    documentTracker: null,
  };

  constructor(props) {
    super(props);

    this.onContractCreated = this.onContractCreated.bind(this);
  }

  // Create Ledger for Consumer
  onContractCreated = async (documentTracker) => {

    // Update state to re-issue a re-render
    this.setState({
      quantity: 1,
      documentTracker: documentTracker
    });

  };

  render () {

    console.log('rendering');
    return <Layout onContractCreated={this.onContractCreated} documentTracker={this.state.documentTracker} />

  }
};

export default App;