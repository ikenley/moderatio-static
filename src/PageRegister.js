import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Redirect } from "react-router-dom";

const propTypes = {};

const PageRegister = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false); //Whether user has successfully registered

  //Form event handlers
  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  });

  const handleNameChange = useCallback(e => {
    setName(e.target.value);
  });

  const handlePwChange = useCallback(e => {
    setPw(e.target.value);
  });

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (email && name && pw) {
      auth.register(
        email,
        pw,
        name,
        successResult => {
          setHasRegistered(true);
        },
        error => {
          setErrorMessage(error.message);
        }
      );
    }
  });

  //If registered successfully, redirect to verify page
  if (hasRegistered) {
    return <Redirect to="/verify" />;
  }

  //Else show registration form
  return (
    <div className="page-signup container">
      <div className="py-5 px-3 text-center">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
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
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="Name"
            required
            autoFocus
            value={name}
            onChange={handleNameChange}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

PageRegister.propTypes = propTypes;
export default PageRegister;
