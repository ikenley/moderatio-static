import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import PageMain from "./PageMain";
import PageSignup from "./PageSignup";
import PageLogin from "./PageLogin";

const propTypes = {};

const Navbar = () => {
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
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = propTypes;
export default Navbar;
