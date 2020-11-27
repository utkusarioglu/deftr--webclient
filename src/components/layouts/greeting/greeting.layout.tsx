import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LocalText, { codeToLocalString } from '../../utils/local-text/LocalText';

function GreetingLayout() {
  return (
    <div>
      <div>
        <LocalText {...{ code: 'hero', variant: 'h1', block: true }} />
        <LocalText {...{ code: 'heroSub', variant: 'h3', block: true }} />
        <LocalText
          {...{ code: 'helloPerson', substitutions: ['UserBanana'] }}
        />
      </div>
      <Button
        {...{
          component: Link,
          to: '/login',
          variant: 'contained',
          color: 'primary',
        }}
      >
        {codeToLocalString('login')}
      </Button>
    </div>
  );
}

export default GreetingLayout;
