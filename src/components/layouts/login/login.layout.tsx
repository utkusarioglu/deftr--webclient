import React from 'react';
import LoginFeature from 'src/components/views/login/login.feature';
import { classNames } from './login.layout.styles';

import LocalText from '../../utils/local-text/LocalText';

function LoginLayout() {
  return (
    <div {...{ className: classNames.loginLayout }}>
      <div {...{ className: classNames.loginFeatureWrapper }}>
        <LoginFeature />
        <LocalText {...{ code: 'clickHere' }} />
      </div>
    </div>
  );
}

export default LoginLayout;
