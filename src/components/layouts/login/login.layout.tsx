import React from 'react';
import Grid from '@material-ui/core/Grid';
import CopyrightView from 'src/components/views/copyright/Copyright.view';
import { makeStyles } from '@material-ui/core/styles';
import LoginView from 'src/components/views/login/Login.view';

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
      <LoginView />
      <CopyrightView />
    </Grid>
  );
}

export default LoginLayout;
