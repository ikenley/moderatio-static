import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import useModal from "../utility/useModal";

const propTypes = {
  modal: PropTypes.object,
};

const CreateRecipeModal = ({ modal }) => {
  return (
    <div className="create-recipe-modal">
      <Modal show={modal.show} onHide={modal.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={modal.close}>
            Close
          </button>
          <button className="btn btn-primary" onClick={modal.close}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CreateRecipeModal.propTypes = propTypes;
export default CreateRecipeModal;
