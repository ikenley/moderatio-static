import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import useInput from "../utility/useInput";

const propTypes = {
  modal: PropTypes.object,
  handleCreate: PropTypes.func,
};

const MAX_FILE_SIZE = 10000000;

const CreateRecipeModal = ({ modal, handleCreate }) => {
  const nameInput = useInput("");
  const urlInput = useInput("");
  const descInput = useInput("");
  const [imageName, setImageName] = useState("");
  const fileInput = useRef();

  const handleCreateClick = useCallback(() => {
    const recipe = {
      name: nameInput.value,
      url: urlInput.value,
      description: descInput.value,
      imageName: imageName,
    };
    if (recipe.name && recipe.url) {
      handleCreate(recipe);
      modal.close();
    }
  }, [nameInput, urlInput, descInput, imageName]);

  const handleFileChange = useCallback((e) => {
    const file = fileInput.current.files[0];
    if (file.size > MAX_FILE_SIZE) {
      alert("Max file size exceeded");
      return;
    }
    setImageName(file.name);
  });

  return (
    <div className="create-recipe-modal">
      <Modal size="lg" show={modal.show} onHide={modal.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label htmlFor="create-recipe-modal-name" className="col-sm-2 col-form-label text-right">
              Name
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="reate-recipe-modal-name" {...nameInput} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="create-recipe-modal-url" className="col-sm-2 col-form-label text-right">
              URL
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="reate-recipe-modal-url" {...urlInput} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="create-recipe-modal-desc" className="col-sm-2 col-form-label text-right">
              Description
            </label>
            <div className="col-sm-10">
              <textarea rows="4" type="text" className="form-control" id="reate-recipe-modal-desc" {...descInput} />
            </div>
          </div>
          <input type="file" ref={fileInput} onChange={handleFileChange} accept="image/jpeg,image/png"></input>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={modal.close}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleCreateClick}>
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CreateRecipeModal.propTypes = propTypes;
export default CreateRecipeModal;
