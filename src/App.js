import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import useCognitoAuth from "./auth/useCognitoAuth";
import AxiosHelper from "./utility/AxiosHelper";
import PageMain from "./PageMain";
import PageRegister from "./auth/PageRegister";
import PageVerify from "./auth/PageVerify";
import PageLogin from "./auth/PageLogin";
import PageRecipes from "./recipes/PageRecipes";

AxiosHelper.configure();

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
          <Route path="/recipes">
            <PageRecipes auth={auth} />
          </Route>
          <Route path="/">
            <PageRecipes auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = propTypes;
export default App;
