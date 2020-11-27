import React from 'react';
import Grid from '@material-ui/core/Grid';
import CopyrightView from 'src/components/views/copyright/Copyright.view';
import LoginFeature from 'src/components/views/login/login.feature';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyItems: 'center',
  },
});

function LoginLayout() {
  const classes = useStyles();

  return (
    <Grid
      {...{
        className: classes.container,
        container: true,
      }}
    >
      <LoginFeature />
      <CopyrightView />
    </Grid>
  );
}

export default LoginLayout;
