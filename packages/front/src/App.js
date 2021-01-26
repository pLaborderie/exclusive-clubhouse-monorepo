import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './router';
import UserStore, { UserContext } from './stores/UserStore';

function App() {
  const userStore = new UserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={userStore}>
        <Layout>
          <Switch>
            {routes.map(route => (
              <Route path={route.link} component={route.component} exact={route.exact} />
            ))}
          </Switch>
        </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
