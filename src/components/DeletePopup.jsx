import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import API_BASE_URL from "../../apiConfig";

export default function DeletePop({ show, onClose, officer, refreshOfficers }) {
  if (!show) return null;

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/officer/${officer.id}`);
      onClose();
      refreshOfficers();
    } catch (error) {
      console.error("There was an error deleting the officer!", error);
      onClose();
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body text-dark fs-3">
            <p>
              Are you sure you want to delete Officer {officer.id} -{" "}
              {officer.name}?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
