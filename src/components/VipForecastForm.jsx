import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

const VipForecastForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    date: "",
    time: "",
    modeofArrival: "",
    entryRoute: "",
    exitRoute: "",
    PlaceofStay: "",
    crowd: "",
    officer: "",
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
    console.log(formData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/addvipforecast`, // Update the API endpoint
        {
          ...formData,
          crowd: formData.crowd === "yes", // Convert to Boolean
        }
      );
      console.log("Success:", response.data);
      setMessage("Success");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error");
    }
    setTimeout(() => onClose(), 3000);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="vipform">
      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="name">
          Name
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter the Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="place">
          Program Place
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="place"
            className="form-control"
            placeholder="Enter the Place"
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
            required
            min={today} // Prevent selecting a previous date
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
        <label className="h4 col-sm-4" htmlFor="modeofArrival">
          Mode of Arrival
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="modeofArrival"
            className="form-control"
            placeholder="Enter the Mode of Arrival"
            name="modeofArrival"
            value={formData.modeofArrival}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="entryRoute">
          Entry Route
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="entryRoute"
            className="form-control"
            placeholder="Enter the Entry Route"
            name="entryRoute"
            value={formData.entryRoute}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="exitRoute">
          Exit Route
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="exitRoute"
            className="form-control"
            placeholder="Enter the Exit Route"
            name="exitRoute"
            value={formData.exitRoute}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="h4 col-sm-4" htmlFor="PlaceofStay">
          Place of Stay
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="PlaceofStay"
            className="form-control"
            placeholder="Enter the Place of Stay"
            name="PlaceofStay"
            value={formData.PlaceofStay}
            onChange={handleChange}
            required
          />
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
        <label className="h4 col-sm-4" htmlFor="officer">
          Liaisoning Officer
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="officer"
            className="form-control"
            placeholder="Enter the Name"
            name="officer"
            value={formData.officer}
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

export default VipForecastForm;
