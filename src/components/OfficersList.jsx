import React, { useEffect, useState } from "react";
import axios from "axios";
import "./officerslist_style.css";
import API_BASE_URL from "../../apiConfig";
import AddOfficerPopup from "./AddOfficerPopup"; // Import the new component

export default function Offices() {
  const [officers, setOfficers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch officer data from the server
  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = () => {
    axios
      .get(`${API_BASE_URL}/officer`)
      .then((response) => {
        console.log(response.data);
        setOfficers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the officers!", error);
      });
  };

  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="container">
      <div className="profile__list__heading d-flex justify-content-between align-items-center">
        <h3>Officers</h3>
        <button className="btn btn-success" onClick={handleShowPopup}>
          Add Officer
        </button>
      </div>
      <div className="list-group">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">ID: {officer.id}</h5>
              <h6 className="mb-1">Name: {officer.name}</h6>
              <p className="mb-1">Designation: {officer.designation}</p>
            </div>
            <button className="btn btn-primary btn-sm">Edit</button>
          </div>
        ))}
      </div>

      <AddOfficerPopup
        show={showPopup}
        handleClose={handleClosePopup}
        refreshOfficers={fetchOfficers} // Pass down the function to refresh the officers list
      />
    </div>
  );
}
