import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import type { onclickSubmit } from './login.types';
import { codeToLocalString } from '../../utils/local-text/local-text.service';
import Container from '@material-ui/core/Container';

interface Props {
  submitLoginForm: onclickSubmit;
}

function LoginView({ submitLoginForm }: Props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // newValue?: string
  ) => {
    const newValue = event.target.value;
    if (!newValue || newValue.length <= 12) {
      setUsername(newValue || '');
    }
  }, []);

  const onChangePassword = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      console.log(newValue);
      setPassword(newValue || '');
    },
    []
  );

  const onClickSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    submitLoginForm(username, password);
  };

  return (
    <Fade {...{ in: true }}>
      <Container {...{ className: classes.container, maxWidth: 'xs' }}>
        <Paper {...{ className: classes.loginPaper, elevation: 1, width: 100 }}>
          <form
            {...{
              noValidate: true,
              className: classes.loginForm,
            }}
          >
            <TextField
              {...{
                label: 'Username',
                onChange: onChangeUsername,
                value: username,
                required: true,
                autoFocus: true,
                variant: 'filled',
                fullWidth: true,
                autoComplete: 'current-username',
                className: classes.username,
              }}
            />
            <TextField
              {...{
                label: 'Password',
                type: 'password',
                required: true,
                variant: 'filled',
                fullWidth: true,
                onChange: onChangePassword,
                autoComplete: 'current-password',
                className: classes.standardSpacing,
              }}
            />
            <FormControlLabel
              {...{
                control: (
                  <Checkbox
                    {...{
                      value: 'remember',
                      color: 'primary',
                    }}
                  />
                ),
                label: 'Remember me',
                className: classes.rememberMe,
              }}
            />
            <Button
              {...{
                className: classes.standardSpacing,
                color: 'primary',
                variant: 'contained',
                onClick: onClickSubmit,
                disableElevation: true,
                fullWidth: true,
              }}
            >
              {codeToLocalString('login')}
            </Button>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  loginPaper: {
    flexDirection: 'column',
  },
  loginForm: {
    padding: theme.spacing(4),
  },
  username: {
    margin: theme.spacing(0),
  },
  standardSpacing: {
    margin: theme.spacing(3, 0, 0),
  },
  rememberMe: {
    margin: theme.spacing(1, -1.5, 0),
  },
}));

export default LoginView;
