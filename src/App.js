import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import PageMain from "./PageMain";
import PageSignup from "./PageSignup";
import PageLogin from "./PageLogin";

const propTypes = {};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/signup">
            <PageSignup />
          </Route>
          <Route path="/login">
            <PageLogin />
          </Route>
          <Route path="/">
            <PageMain />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = propTypes;
export default App;
