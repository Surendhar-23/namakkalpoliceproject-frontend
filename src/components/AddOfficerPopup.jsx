import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export default function AddOfficerPopup({
  show,
  handleClose,
  refreshOfficers,
  officer, // New prop for the officer being edited
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (officer) {
      // If an officer is passed in, populate the form fields with the officer's data
      setId(officer.id);
      setName(officer.name);
      setDesignation(officer.designation);
    } else {
      // Reset the form fields if no officer is passed in (i.e., adding a new officer)
      setId("");
      setName("");
      setDesignation("");
    }
  }, [officer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const officerData = { id, name, designation };

    if (officer) {
      // If editing an existing officer
      axios
        .put(`${API_BASE_URL}/officer/${officer.id}`, officerData)
        .then((response) => {
          setMessage("Officer updated successfully!");
          setTimeout(() => {
            refreshOfficers();
            handleClose();
          }, 3000);
        })
        .catch((error) => {
          setMessage("There was an error updating the officer.");
          console.error("There was an error updating the officer!", error);
        });
    } else {
      // If adding a new officer
      axios
        .post(`${API_BASE_URL}/addofficer`, officerData)
        .then((response) => {
          setMessage("Officer added successfully!");
          setId("");
          setName("");
          setDesignation("");
          setTimeout(() => {
            refreshOfficers();
            handleClose();
          }, 3000);
        })
        .catch((error) => {
          setMessage("There was an error adding the officer.");
          console.error("There was an error adding the officer!", error);
        });
    }
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark fs-3">
              {officer ? "Edit Officer" : "Add New Officer"}
            </h5>
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
                  disabled={!!officer} // Disable the ID field when editing
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
                {officer ? "Update Officer" : "Add Officer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
