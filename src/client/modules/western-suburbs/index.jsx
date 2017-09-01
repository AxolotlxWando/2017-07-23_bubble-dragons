/* Western Suburbs Page Module */

// React
import React from 'react';
import { Route, Link } from 'react-router-dom';

// Web UI
import { NavItem } from 'reactstrap';

// Component and helpers
import WesternSuburbs from './containers/western-suburbs';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/" component={WesternSuburbs}/>,
  navItem:
    <NavItem>
      <Link to="/" className="nav-link">Western Suburbs</Link>
    </NavItem>,
  reducer: { westernSuburbs: reducers }
});
