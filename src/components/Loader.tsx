import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles: any = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
  },
  progress: {
    color: theme.palette.background.paper,
  },
});

function Loader(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} disableShrink size={120} />
    </div>
  );
}

export default withStyles(useStyles)(Loader);
