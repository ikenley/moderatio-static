import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, Redirect } from "react-router-dom";

const propTypes = {};

const PageLogin = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  //Form event handlers
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  });

  const handlePwChange = useCallback((e) => {
    setPw(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (email && pw) {
      auth.signIn(
        email,
        pw,
        () => {
          setisLoggedIn(true);
        },
        (error) => {
          setErrorMessage(error.message);
        }
      );
    }
  });

  //If registered successfully, redirect to main page
  if (isLoggedIn) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="page-signup container">
      <div className="py-5 px-3 text-center">
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
        <form className="form-signin">
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            value={pw}
            onChange={handlePwChange}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onSubmit={handleSubmit}
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <div>
          No account yet? Why not <Link to="/signup">Sign up</Link>?
        </div>
      </div>
    </div>
  );
};

PageLogin.propTypes = propTypes;
export default PageLogin;
