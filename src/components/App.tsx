import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';
import { ServerResponse } from '../../../deftr--public-api/src';

import GreetingRoute from './routes/greeting.route';

function App() {
  const request = Math.random().toString().replace('.', '').slice(1, 6);
  const initial: ServerResponse = {
    test: request,
    response: 'waiting',
  };
  const [response, setResponse] = useState<ServerResponse>(initial);

  useEffect(() => {
    let location = window.location.href;
    location = location.slice(-1) === '/' ? location.slice(0, -1) : location;
    fetch(`${location}:4000/${request}`)
      .then((data) => {
        return data.text();
      })
      .then((body) => {
        try {
          const bodyJson: ServerResponse = JSON.parse(body);
          setResponse(bodyJson);
        } catch (e) {}
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

  const LoginRouteLazy = React.lazy(() => import('./routes/login.route'));

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
      <Router>
        <Switch>
          <Route {...{ path: '/', exact: true }}>
            <GreetingRoute />
          </Route>
          <Route {...{ path: '/login' }}>
            <Suspense fallback={<p></p>}>
              <LoginRouteLazy />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
