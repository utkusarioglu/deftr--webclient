import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Link } from 'react-router-dom';
import LocalText, { codeToLocalString } from '../../utils/local-text/LocalText';

function GreetingLayout() {
  return (
    <div>
      <div>
        <LocalText {...{ code: 'hero', variant: 'mega', block: true }} />
        <LocalText {...{ code: 'heroSub', variant: 'large', block: true }} />
        <LocalText
          {...{ code: 'helloPerson', substitutions: ['UserBanana'] }}
        />
      </div>
      <Link {...{ to: '/login' }}>
        <PrimaryButton {...{ text: codeToLocalString('login') }} />
      </Link>
    </div>
  );
}

export default GreetingLayout;
