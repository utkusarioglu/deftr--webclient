import React, { useState } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import type { onclickSubmit } from './login.types';

interface Props {
  submitLoginForm: onclickSubmit;
}

function LoginView({ submitLoginForm }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = React.useCallback(
    (
      _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      if (!newValue || newValue.length <= 5) {
        setUsername(newValue || '');
      }
    },
    []
  );

  const onChangePassword = React.useCallback(
    (
      _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      if (!newValue || newValue.length <= 5) {
        setPassword(newValue || '');
      }
    },
    []
  );

  const onClickSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    submitLoginForm(username, password);
  };

  const stackTokens: IStackTokens = {
    childrenGap: 10,
    maxWidth: 300,
  };

  return (
    <Stack {...{ tokens: stackTokens }}>
      <TextField
        {...{
          label: 'Username',
          onChange: onChangeUsername,
          value: username,
        }}
      />
      <TextField
        {...{
          label: 'Password',
          type: 'password',
          canRevealPassword: true,
          onChange: onChangePassword,
        }}
      />
      <PrimaryButton
        {...{
          text: 'Login',
          onClick: onClickSubmit,
        }}
      />
    </Stack>
  );
}

export default LoginView;
