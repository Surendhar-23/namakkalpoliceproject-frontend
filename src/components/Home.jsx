import { useEffect, useState } from "react";
import Homebox from "./Homebox";
import Latestforecast from "./Latestforecast";
import "./home_style.css";
import AddDutyPopup from "./AddDutyPopup";
import AddForecastPopup from "./AddForecastPopup";
import API_BASE_URL from "../../apiConfig";

export default function Home() {
  const [todayStatusNotCompleted, setTodayStatusNotCompleted] = useState(true);
  const [displayAddDuty, setDisplayAddDuty] = useState(false);
  const [displayForecast, setDisplayForecast] = useState(false);

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  const checkDutyStatus = async function () {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    console.log("Checking duty status for:", formattedDate);

    const URL = `${API_BASE_URL}/duty?date=${encodeURIComponent(
      formattedDate
    )}`;
    console.log("API URL:", URL);

    try {
      const response = await fetchWithTimeout(URL, {}, 5000);
      const data = await response.json();
      console.log("Duty status data:", data);

      if (data && data.length === 0) {
        setTodayStatusNotCompleted(true);
      } else {
        setTodayStatusNotCompleted(false);
      }
    } catch (error) {
      console.log("An error occurred while fetching duty status:", error);

      setTodayStatusNotCompleted(false);
    }
  };

  useEffect(() => {
    checkDutyStatus();
  }, []);

  const handleAddDutyClick = () => {
    setDisplayAddDuty((e) => !e);
  };

  const handleAddForecastClick = () => {
    setDisplayForecast((e) => !e);
  };
  return (
    <div className="home__conatiner">
      {displayAddDuty && <AddDutyPopup onCloseClick={handleAddDutyClick} />}
      {displayForecast && (
        <AddForecastPopup onCloseClick={handleAddForecastClick} />
      )}

      <div className="home__boxes">
        <Homebox
          iconName={"time-five"}
          title={"Schedule Duty"}
          des={"Assign duty for each police officer"}
          btnText={"+ Assign Schedule"}
          todayStatusNotCompleted={todayStatusNotCompleted}
          onButtonClick={handleAddDutyClick}
        />
        <Homebox
          iconName={"calendar"}
          title={"Forecast"}
          des={"Upload event details on calendar"}
          btnText={"+ Assign Forecast"}
          onButtonClick={handleAddForecastClick}
        />
      </div>
      <Latestforecast />
    </div>
  );
}
