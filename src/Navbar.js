import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import PageMain from "./PageMain";
import PageRegister from "./PageRegister";
import PageLogin from "./PageLogin";

const propTypes = {};

const Navbar = ({ auth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  });

  const handleLogout = useCallback(e => {
    e.preventDefault();
    auth.signOut();
  });

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a className="navbar-brand" href="#">
        Moderatio
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded={isExpanded ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={handleToggleClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={classNames("navbar-collapse", { collapse: !isExpanded })}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {auth.isSignedIn ? (
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleLogout}>
                Logout
              </a>
            </li>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link" activeClassName="active">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = propTypes;
export default Navbar;
