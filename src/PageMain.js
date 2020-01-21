import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

const propTypes = {};

const PageMain = ({ auth }) => {
  const { isSignedIn, user } = auth;
  return (
    <div className="container">
      <div className="py-5 px-3 text-center">
        <div className="jumbotron">
          <div className="container">
            <h1>Open the pod bay doors, HAL</h1>
            {isSignedIn ? (
              <p>
                Welcome, <span className="text-primary">{user.email}</span>
              </p>
            ) : (
              <p>
                You are not signed in. Considering <Link to="/login">logging in</Link> or, if you haven't yet,{" "}
                <Link to="/signup">signing up</Link>.
              </p>
            )}
            <p>Actual content coming soon</p>
            <p>
              <a
                className="btn btn-primary btn-lg"
                href="https://github.com/ikenley/moderatio"
                role="button"
                target="_blank"
              >
                Learn more &raquo;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PageMain.propTypes = propTypes;
export default PageMain;
