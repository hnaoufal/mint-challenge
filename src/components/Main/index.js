import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navigation from 'cmp/Navigation/Navigation';

import Market from 'cmp/MarketOverview/Market';
import Liquid from 'cmp/Liquidity/Liquid';

import './Main.scss';
import store from '../../store';

const Main = ({ history }) => (
  <Router history={history}>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Market} />
        <Route exact path="/liquidity" component={Liquid} />
      </Switch>
    </div>
  </Router>
);

export default Main;

