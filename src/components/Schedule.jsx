import { useEffect, useState } from "react";
import StationDetails from "./StationDetails";
import GovernmentProperty from "./GovernmentProperty";
import Duty from "./Duty";
import "./schedule_style.css";
import API_BASE_URL from "../../apiConfig";

export default function Schedule() {
  const [stationDetails, setStationDetails] = useState([]);
  const [governmentProperty, setGovernmentProperty] = useState([]);
  const [message, setMessage] = useState("");

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  useEffect(() => {
    async function getStationInfo() {
      const URL = `${API_BASE_URL}/stationinfo`;
      try {
        const response = await fetchWithTimeout(URL, {}, 5000);
        const [data] = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No data found");
        } else setMessage("");

        setStationDetails(data.stationDetails.strengthParticulars);
        setGovernmentProperty(data.governmentProperty);
        //   setpoliceDuty(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage(error.message);
      }
    }

    getStationInfo();
  }, []);

  return (
    <div className="schedule__container">
      <StationDetails stationDetails={stationDetails} />
      <GovernmentProperty governmentProperty={governmentProperty} />
      <Duty />
    </div>
  );
}
