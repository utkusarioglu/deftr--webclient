import React from 'react';
import LoginView from './login.view';
import type { onclickSubmit as submitLoginForm } from './login.types';

function LoginFeature() {
  const submitLoginForm: submitLoginForm = (username, password) => {
    fetch(`http://192.168.1.152:4000/login`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ username, password }),
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log('response:\n', data);
      });
  };
  return <LoginView {...{ submitLoginForm }} />;
}

export default LoginFeature;
