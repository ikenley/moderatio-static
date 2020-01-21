import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Redirect } from "react-router-dom";

const propTypes = {};

const PageVerify = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); //Whether user has successfully verified

  //Form event handlers
  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  });

  const handleCodeChange = useCallback(e => {
    setCode(e.target.value);
  });

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (email && code) {
      auth.verify(
        email,
        code,
        successResult => {
          setIsSuccess(true);
        },
        error => {
          setErrorMessage(error.message);
        }
      );
    }
  });

  //If registered successfully, redirect to verify page
  if (isSuccess) {
    return <Redirect to="/Main" />;
  }

  return (
    <div className="page-signup container">
      <div className="py-5 px-3 text-center">
        <h1 className="h3 mb-3 font-weight-normal">Verify</h1>
        <div className="alert alert-secondary">Please enter your email address and six-digit verification code</div>
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
          <label htmlFor="inputCode" className="sr-only">
            Verification Code
          </label>
          <input
            type="text"
            id="inputCode"
            className="form-control"
            placeholder="Verification Code"
            required
            autoFocus
            value={code}
            onChange={handleCodeChange}
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

PageVerify.propTypes = propTypes;
export default PageVerify;
