import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "js/onscroll";
import "./Header.scss";

const Header = props => {
  let className = (props.location.pathname === "/") ? "page-header" : "page-header hide";

  return (
    <header className={className}>
      <p>Joe McGrath</p>
      {props.children}
    </header>
  );
} // Header Component
Header.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}; // Header.propTypes

const HeaderWithRouter = withRouter(Header);

export default HeaderWithRouter;
