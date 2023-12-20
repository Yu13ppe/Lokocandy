import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Routes from './Config/Routes';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {Routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component} />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
