import { useState, useEffect } from "react";
import DutyForm from "./DutyForm";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

const PoliceDutyList = ({ onCloseClick }) => {
  const [policeOfficers, setPoliceOfficers] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch police officers data from the server
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/officer`)
      .then((response) => {
        console.log(response.data);
        setMessage("");
        setPoliceOfficers(response.data);
        setScheduleData(
          response.data.map((officer) => ({
            id: officer.id,
            name: officer.name,
            mode: "",
            date: "",
            duty: "",
          }))
        );
      })
      .catch((error) => {
        console.error("There was an error fetching the officers!", error);
        setMessage("Failed to load police officers data.");
      });
  }, []);

  const getDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const updateSchedule = (index, mode, duty) => {
    const newScheduleData = [...scheduleData];
    newScheduleData[index] = {
      ...newScheduleData[index],
      mode,
      date: getDate(),
      duty,
    };
    setScheduleData(newScheduleData);
    console.log(scheduleData);
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    const isFormValid = scheduleData.every(
      (entry) => entry.name && entry.mode && entry.date && entry.duty
    );
    if (!isFormValid) {
      setMessage("Please fill out all the details for each officer.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addduty`,
        scheduleData
      );
      setMessage("Successfully added duties!");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding duties.");
    }
  };

  return (
    <div className="row">
      {policeOfficers.length == 0 && (
        <p className="text-center fs-3"> No Officers in station..!</p>
      )}
      {policeOfficers.map((officer, index) => (
        <DutyForm
          key={officer.id}
          officer={officer}
          index={index}
          updateSchedule={updateSchedule}
        />
      ))}
      <p className="text-center my-2 fs-3">{message}</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-primary submit-duty-list fs-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary fs-3"
          onClick={onCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PoliceDutyList;
