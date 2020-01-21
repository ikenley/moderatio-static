import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import useCognitoAuth from "./useCognitoAuth";
import PageMain from "./PageMain";
import PageRegister from "./PageRegister";
import PageVerify from "./PageVerify";
import PageLogin from "./PageLogin";

const propTypes = {};

const App = () => {
  const auth = useCognitoAuth();
  return (
    <Router>
      <div>
        <Navbar auth={auth} />
        <Switch>
          <Route path="/signup">
            <PageRegister auth={auth} />
          </Route>
          <Route path="/verify">
            <PageVerify auth={auth} />
          </Route>
          <Route path="/login">
            <PageLogin auth={auth} />
          </Route>
          <Route path="/main">
            <PageMain auth={auth} />
          </Route>
          <Route path="/">
            <PageMain auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = propTypes;
export default App;
