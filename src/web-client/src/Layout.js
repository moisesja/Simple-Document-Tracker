/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Publisher from './components/Publisher';
import Viewer from './components/Viewer';
import Inquiries from './components/Inquiries';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const layout = (props) => {
    
  const classes = useStyles();
  
  console.log('props', props.onContractCreated, props.documentTracker);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} />        
        <Grid item xs={6}>
          <Publisher onContractCreated={props.onContractCreated} />
        </Grid>
        <Grid item xs={6}>
          <Viewer documentTracker={props.documentTracker} />
        </Grid>
        <Grid item xs={12}>
          <Inquiries documentTracker={props.documentTracker}  />
        </Grid>
      </Grid>
    </div>
  );
};

layout.propTypes = {
  onContractCreated: PropTypes.func.isRequired,
  documentTracker: PropTypes.object.isRequired,
};

export default layout;