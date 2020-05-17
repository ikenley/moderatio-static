import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import PageMain from "../PageMain";
import PageRegister from "./PageRegister";
import PageLogin from "./PageLogin";
import CognitoAuthService from "./CognitoAuthService";

//React Hook for including AWS Cognito auth state
//Inject at the root-ish component and pass the `auth` object

function useCognitoAuth() {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const service = useRef();

  //Initialize service on first load
  useEffect(() => {
    service.current = new CognitoAuthService();
    handleAuthChange();
  }, []);

  const handleAuthChange = () => {
    service.current.getUserContext().then((result) => {
      const u = result ? result.user : null;
      const aToken = result ? result.authToken : null;
      setUser(u);
      setAuthToken(aToken);
    });
  };

  const register = useCallback((email, password, name, onSuccess, onFailure) => {
    service.current.register(email, password, name, onSuccess, onFailure);
  });

  const verify = useCallback((email, code, onSuccess, onFailure) => {
    service.current.verify(email, code, onSuccess, onFailure);
  });

  const signIn = useCallback((email, password, onSuccess, onFailure) => {
    service.current.signIn(
      email,
      password,
      () => {
        handleAuthChange();
        onSuccess(user);
      },
      (error) => onFailure(error)
    );
  });

  const signOut = useCallback(() => {
    service.current.signOut();
    setUser(null);
  });

  //TODO fix this binding on functions
  const s = service.current || {};

  return {
    isSignedIn: authToken ? true : false,
    user: user,
    authToken,
    register,
    verify,
    signIn,
    signOut,
  };
}

export default useCognitoAuth;
