import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

const NormalForecastForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    forecastType: "",
    place: "",
    date: "",
    time: "",
    durationStart: "",
    durationEnd: "",
    attender: "",
    permission: "",
    crowd: "",
    caseHistory: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate duration in minutes
    const start = new Date(`1970-01-01T${formData.durationStart}:00`);
    const end = new Date(`1970-01-01T${formData.durationEnd}:00`);
    const duration = (end - start) / (1000 * 60); // Convert milliseconds to minutes

    const postData = {
      forecastType: formData.forecastType,
      place: formData.place,
      date: formData.date,
      time: formData.time,
      duration: duration,
      attender: formData.attender,
      permission: formData.permission === "allowed" ? "Allowed" : "Not Allowed",
      crowd: formData.crowd === "yes",
      caseHistory: formData.caseHistory,
    };

    console.log(postData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/addnormalforecast`,
        postData
      );
      console.log("Success:", response.data);
      setMessage("Success");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error");
    }

    setTimeout(() => onClose(), 3000);
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="vipform">
      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="commonoption">
          Forecast
        </label>
        <div className="col-sm-8">
          <select
            className="form-control"
            id="commonoption"
            name="forecastType"
            value={formData.forecastType}
            onChange={handleChange}
            required
          >
            <option value="">Select Option</option>
            <option value="demonstration">Demonstration</option>
            <option value="fasting">Fasting</option>
            <option value="agitation">Agitation/Obstruction</option>
            <option value="temple">Temple bandobust</option>
            <option value="petition">Petition Mela</option>
            <option value="general">General forecast</option>
            <option value="others">Other Forecast</option>
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="location">
          Place
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="location"
            className="form-control mx-1"
            placeholder="Enter Location"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="date">
          Date
        </label>
        <div className="col-sm-8">
          <input
            type="date"
            id="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today} // Disable previous dates
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="time">
          Time
        </label>
        <div className="col-sm-8">
          <input
            type="time"
            id="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="durationStart">
          Duration
        </label>
        <div className="col-sm-8 inputDiv">
          <input
            type="time"
            id="durationStart"
            className="form-control"
            name="durationStart"
            value={formData.durationStart}
            onChange={handleChange}
            required
          />
          <p className="h3 mx-2">To</p>
          <input
            type="time"
            id="durationEnd"
            className="form-control"
            name="durationEnd"
            value={formData.durationEnd}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="attender">
          Leader/Party
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="attender"
            className="form-control"
            placeholder="Enter the Name"
            name="attender"
            value={formData.attender}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4">Permission</label>
        <div className="col-sm-8 chech big">
          <div className="form-check">
            <input
              type="radio"
              id="permissionAllowed"
              name="permission"
              value="allowed"
              className="form-check-input"
              checked={formData.permission === "allowed"}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="permissionAllowed"
              className="form-check-label permission"
            >
              Allowed
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="permissionNotAllowed"
              name="permission"
              value="notAllowed"
              className="form-check-input"
              checked={formData.permission === "notAllowed"}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="permissionNotAllowed"
              className="form-check-label permission"
            >
              Not Allowed
            </label>
          </div>
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4">Crowd Gathering</label>
        <div className="col-sm-8 chech">
          <div className="form-check">
            <input
              type="radio"
              id="crowdGatherYes"
              name="crowd"
              value="yes"
              className="form-check-input"
              checked={formData.crowd === "yes"}
              onChange={handleChange}
              required
            />
            <label htmlFor="crowdGatherYes" className="form-check-label">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="crowdGatherNo"
              name="crowd"
              value="no"
              className="form-check-input"
              checked={formData.crowd === "no"}
              onChange={handleChange}
              required
            />
            <label htmlFor="crowdGatherNo" className="form-check-label">
              No
            </label>
          </div>
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="caseHistory">
          Case History
        </label>
        <div className="col-sm-8">
          <textarea
            id="caseHistory"
            className="form-control"
            rows="3"
            name="caseHistory"
            placeholder="Enter If any"
            value={formData.caseHistory}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary form-control mt-5 forecast__sumbit__btn"
      >
        ADD
      </button>

      {message && <p style={{ marginTop: "12px" }}>{message}</p>}
    </form>
  );
};

export default NormalForecastForm;
