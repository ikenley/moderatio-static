import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import useModal from "../utility/useModal";
import CreateRecipeModal from "./CreateRecipeModal";

const propTypes = {};

const PageRecipes = ({ auth }) => {
  const { isSignedIn, user } = auth;
  const [recipes, setRecipes] = useState(null);
  const modal = useModal(true);

  const getRecipes = () => {
    axios.get("api/v1/recipes").then((result) => {
      setRecipes(result.data);
    });
  };

  useEffect(() => {
    if (auth.isSignedIn) {
      getRecipes();
    }
  }, [auth]);

  const handleCreate = useCallback((recipe) => {
    if (auth.isSignedIn) {
      axios.post("api/v1/recipes", recipe).then(() => {
        getRecipes();
      });
    }
  });

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="page-recipes container-fluid">
      <div className="jumbotron mb-3 p-3 text-center">
        <div className="container">
          <h1>Recipes</h1>
          Functionality coming soon
        </div>
      </div>
      <button className="btn btn-lg btn-primary rounded-0 mb-3" onClick={modal.open}>
        <i className="fas fa-plus"></i> Create
      </button>
      {recipes && (
        <div className="row">
          {recipes.map((r) => (
            <div key={r.id} className="col-sm-3">
              <div className="card rounded-0">
                <h5 className="card-title text-center my-2">{r.name}</h5>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateRecipeModal modal={modal} handleCreate={handleCreate} />
    </div>
  );
};

PageRecipes.propTypes = propTypes;
export default PageRecipes;
