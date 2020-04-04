import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

const propTypes = {};

const PageRecipes = ({ auth }) => {
  const { isSignedIn, user } = auth;

  if (!isSignedIn) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="container">
      <div className="py-5 px-3 text-center">
        <div className="jumbotron">
          <div className="container">
            <h1>Recipes</h1>
            Coming soon
          </div>
        </div>
      </div>
    </div>
  );
};

PageRecipes.propTypes = propTypes;
export default PageRecipes;
