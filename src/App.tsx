// eslint-disable-next-line no-use-before-define
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:category?" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
