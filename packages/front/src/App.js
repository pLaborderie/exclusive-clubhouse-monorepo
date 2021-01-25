import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './router';

function App() {
  console.log(routes);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map(route => (
            <Route path={route.link} component={route.component} exact={route.exact} />
          ))}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
