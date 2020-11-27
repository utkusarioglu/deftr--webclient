import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GreetingRoute from './routes/greeting.route';
import AppBarView from './views/app-bar/AppBarView';

let theme = createMuiTheme({
  shape: {
    borderRadius: 0,
  },
});
theme = responsiveFontSizes(theme);

function App() {
  const LoginRouteLazy = React.lazy(() => import('./routes/login.route'));

  return (
    <ThemeProvider {...{ theme }}>
      <div {...{ className: 'App' }}>
        <Router>
          <AppBarView />
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
    </ThemeProvider>
  );
}

export default App;
