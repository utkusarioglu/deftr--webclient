import React, { useState, useEffect } from 'react';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';
import { ServerResponse } from '../../../api/src';

function App() {
  const request = Math.random().toString().replace('.', '').slice(1, 6);
  const initial: ServerResponse = {
    test: request,
    response: 'waiting',
  };
  const [response, setResponse] = useState<ServerResponse>(initial);

  useEffect(() => {
    const location = window.location.href.slice(0, -1);
    fetch(`${location}:4000/${request}`)
      .then((data) => {
        return data.text();
      })
      .then((body) => {
        const bodyJson: ServerResponse = JSON.parse(body);
        setResponse(bodyJson);
      });
  }, []);

  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true,
    items: [
      {
        key: 'rename',
        text: 'Rename',
        onClick: () => console.log('Rename clicked'),
      },
      {
        key: 'edit',
        text: 'Edit',
        onClick: () => console.log('Edit clicked'),
      },
      {
        key: 'properties',
        text: 'Properties',
        onClick: () => console.log('Properties clicked'),
      },
      {
        key: 'linkNoTarget',
        text: 'Link same window',
        href: 'http://bing.com',
      },
      {
        key: 'linkWithTarget',
        text: 'Link new window',
        href: 'http://bing.com',
        target: '_blank',
      },
      { key: 'disabled', text: 'Disabled item', disabled: true },
    ],
  }));

  return (
    <div {...{ className: 'App' }}>
      <header {...{ className: 'App-header' }}>
        <DefaultButton
          {...{
            text: `${response.test}:${response.response}`,
            persistMenu: true,
            menuProps,
          }}
        />
      </header>
    </div>
  );
}

export default App;
