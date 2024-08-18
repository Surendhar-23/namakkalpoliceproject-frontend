import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export default function AddOfficerPopup({
  show,
  handleClose,
  refreshOfficers,
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOfficer = { id, name, designation };
    setMessage("");
    axios
      .post(`${API_BASE_URL}/addofficer`, newOfficer)
      .then((response) => {
        console.log("Officer added:", response.data);
        setMessage("Officer added successfully..!");
        setId("");
        setName("");
        setDesignation("");
        setTimeout(() => {
          refreshOfficers(); // Refresh the list of officers after adding
          handleClose(); // Close the modal after successful submission
        }, 3000);
      })
      .catch((error) => {
        setMessage("There was an error adding the officer");
        console.error("There was an error adding the officer!", error);
      });
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Officer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="officerId" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="officerId"
                  placeholder="Enter officer ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="officerName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="officerName"
                  placeholder="Enter officer name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="officerDesignation" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="officerDesignation"
                  placeholder="Enter officer designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
              {message && (
                <p className="text-center text-dark fs-3"> {message} </p>
              )}
              <button type="submit" className="btn btn-primary">
                Add Officer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
