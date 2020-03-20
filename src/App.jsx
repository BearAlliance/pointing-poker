import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.scss';
import { Nav } from './nav/nav';
import { Loading } from './loading/loading';
import { Footer } from './footer/footer';

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  const routes = [
    {
      path: '/',
      component: lazy(() => import('./pages/home/home-page'))
    }
  ];

  return (
    <Router>
      <Nav />
      <div className="page-content">
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
