import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import "./Menu.scss";

const MenuItem = ({children, to, id, exact}) => {
  return (
    <Route path={to} exact={exact} children={({match}) => (
      <li id={id} className={match ? "active" : null}>
        <Link to={to}>{children}</Link>
      </li>
    )} />
  );
}; // MenuItem Component
MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool
} // MenuItem.propTypes

const Menu = props => {
  return (
    <nav>
      <ul>
        {props.pages.map(page =>
          <MenuItem key={page.id} to={page.id} id={page.id} exact>
            {page.title}
          </MenuItem>
        )}
        <MenuItem to="/" id="controls-close" exact>Close</MenuItem>
      </ul>
    </nav>
  );
}; // Menu Component
Menu.propTypes = {
  pages: PropTypes.array.isRequired
} // Menu.propTypes

export default Menu;
