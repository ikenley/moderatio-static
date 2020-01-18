import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {};

const App = () => {
  return (
    <div className="container">
      <div className="py-5 px-3 text-center">
        <div className="jumbotron">
          <div className="container">
            <h1>Open the pod bay doors, HAL</h1>
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

App.propTypes = propTypes;
export default App;
