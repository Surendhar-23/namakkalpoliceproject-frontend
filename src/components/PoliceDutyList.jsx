import { useState } from "react";
import DutyForm from "./DutyForm";
import { policeOfficers } from "../data/policeOfficers";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

const PoliceDutyList = ({ onCloseClick }) => {
  const [scheduleData, setScheduleData] = useState(
    Array(policeOfficers.length).fill({
      name: "",
      mode: "",
      date: "",
      duty: "",
    })
  );
  const [message, setMessage] = useState("");

  const getDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const updateSchedule = (index, name, mode, duty) => {
    const newScheduleData = [...scheduleData];
    newScheduleData[index] = {
      name,
      mode,
      date: getDate(),
      duty,
    };
    setScheduleData(newScheduleData);
    console.log(scheduleData);
  };

  const handleSubmit = async () => {
    console.log(scheduleData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/addduty`,
        scheduleData
      );
      setMessage("Successfully duties Added..!");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error);
    }
  };

  return (
    <div className="row">
      {policeOfficers.map((officer, index) => (
        <DutyForm
          key={officer.id}
          officer={officer}
          index={index}
          updateSchedule={updateSchedule}
        />
      ))}
      <p className="text-center my-2 fs-3 ">{message}</p>
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
