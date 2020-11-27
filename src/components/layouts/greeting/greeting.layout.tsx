import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LocalTextUtil, {
  codeToLocalString,
} from '../../utils/local-text/LocalText.util';

function GreetingLayout() {
  return (
    <div>
      <div>
        <LocalTextUtil {...{ code: 'hero', variant: 'h1', block: true }} />
        <LocalTextUtil {...{ code: 'heroSub', variant: 'h3', block: true }} />
        <LocalTextUtil
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
