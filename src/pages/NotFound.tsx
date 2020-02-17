import { Typography } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-polyglot';

const useStyles: any = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function NotFound(props) {
  const { classes, t } = props;

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
        {t('404')}
      </Typography>
    </div>
  );
}

export default translate()(withStyles(useStyles)(NotFound));
