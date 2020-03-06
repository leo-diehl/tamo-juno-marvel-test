import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes';

const mainRoute = '/characters';

function RouteSwitcher() {
  const Routes = routes.map((route) => (
    <Route
      key={route.name}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  ));

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to={mainRoute} />
        )}
      />
      {Routes}
    </Switch>
  );
}

export default RouteSwitcher;
