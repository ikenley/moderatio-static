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
  const service = useRef();

  //Initialize service on first load
  useEffect(() => {
    service.current = new CognitoAuthService();
    service.current.getUser().then((u) => {
      setUser(u);
    });
  }, []);

  const getAuthToken = useCallback(() => {
    return service.current.getAuthToken();
  });

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
        service.current.getUser().then((u) => {
          setUser(u);
          onSuccess(u);
        });
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
    isSignedIn: user ? true : false,
    user: user,
    getAuthToken,
    register,
    verify,
    signIn,
    signOut,
  };
}

export default useCognitoAuth;
