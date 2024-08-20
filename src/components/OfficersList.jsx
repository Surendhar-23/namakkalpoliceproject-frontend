import { useEffect, useState } from "react";
import axios from "axios";
import "./officerslist_style.css";
import API_BASE_URL from "../../apiConfig";
import AddOfficerPopup from "./AddOfficerPopup";
import DeletePopup from "./DeletePopup";
import OfficerDutyListPopup from "./OfficerDutyListPopup";

export default function Offices() {
  const [officers, setOfficers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState(null);
  const [showOfficerDutyList, setShowOfficerDutyList] = useState(false);
  const [officerDuty, setOfficerDuty] = useState(null);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/officer`);
      setOfficers(response.data);
    } catch (error) {
      console.error("There was an error fetching the officers!", error);
    }
  };

  const handleShowPopup = (officer = null, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the parent
    setEditingOfficer(officer);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingOfficer(null);
  };

  const handleDeleteClick = (officer, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the parent
    setOfficerToDelete(officer);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    setOfficerToDelete(null);
  };

  //
  // Close duty list
  const handleCloseDutyList = () => {
    setShowOfficerDutyList(false);
    setOfficerDuty(null);
  };

  //
  // getting officer duties
  const handleUserDetails = async (userId) => {
    try {
      const officerDuties = await axios.get(
        `${API_BASE_URL}/officer/duty/${userId}`
      );
      console.log(officerDuties.data);
      setOfficerDuty(officerDuties.data);
      setShowOfficerDutyList(true);
    } catch (error) {
      console.error("Error fetching officer duties:", error);
    }
  };

  return (
    <div className="container">
      <div className="profile__list__heading d-flex justify-content-between align-items-center">
        <h3>Officers</h3>
        <button
          className="btn btn-success"
          onClick={(event) => handleShowPopup(null, event)}
        >
          Add Officer
        </button>
      </div>
      <div className="list-group">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="list-group-item d-flex justify-content-between align-items-center btn cursor-pointer btn-light"
            onClick={() => handleUserDetails(officer.id)}
          >
            <div>
              <h5 className="mb-1">ID: {officer.id}</h5>
              <h6 className="mb-1">Name: {officer.name}</h6>
              <p className="mb-1">Designation: {officer.designation}</p>
            </div>
            <div className="d-flex gap-4" style={{ width: "150px" }}>
              <button
                className="btn btn-primary btn-md flex-grow-1"
                onClick={(event) => handleShowPopup(officer, event)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary btn-md flex-grow-1"
                onClick={(event) => handleDeleteClick(officer, event)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddOfficerPopup
        show={showPopup}
        handleClose={handleClosePopup}
        refreshOfficers={fetchOfficers}
        officer={editingOfficer}
      />

      <DeletePopup
        show={showDeletePopup}
        onClose={handleCloseDeletePopup}
        refreshOfficers={fetchOfficers}
        officer={officerToDelete}
      />

      <OfficerDutyListPopup
        show={showOfficerDutyList}
        handleClose={handleCloseDutyList}
        officer={officerDuty}
      />
    </div>
  );
}
