import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

import Counter from './containers/counter';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/counter" component={Counter}/>,
  navItem:
    <NavItem>
      <Link to="/counter" className="nav-link">Counter</Link>
    </NavItem>,
  reducer: { counter: reducers }
});
