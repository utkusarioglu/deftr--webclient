import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { codeToLocalString } from '../../utils/local-text/local-text.service';

const AppBarView = () => {
  return (
    <AppBar {...{ position: 'static' }}>
      <Toolbar>
        <Button
          {...{
            component: Link,
            to: '/',
          }}
        >
          {codeToLocalString('appName')}
        </Button>
        <Button
          {...{
            component: Link,
            to: '/login',
          }}
        >
          {codeToLocalString('login')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default AppBarView;
