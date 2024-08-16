import { useState, useEffect } from "react";
import "./latestforecast_style.css";
import API_BASE_URL from "../../apiConfig";

export default function Latestforecast() {
  const [vipdataList, setVipDataList] = useState([]);
  const [normaldataList, setNormalDataList] = useState([]);
  const [message, setMessage] = useState("");

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  const getForecastInfo = async function () {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    setNormalDataList([]);
    setVipDataList([]);

    const normalURL = `${API_BASE_URL}/normalforecast?date=${encodeURIComponent(
      formattedDate
    )}`;

    const vipURL = `${API_BASE_URL}/vipforecast?date=${encodeURIComponent(
      formattedDate
    )}`;

    try {
      const normalResponse = await fetchWithTimeout(normalURL, {}, 5000);
      const normalData = await normalResponse.json();
      const vipResponse = await fetchWithTimeout(vipURL, {}, 5000);
      const vipData = await vipResponse.json();
      setNormalDataList(normalData);
      setVipDataList(vipData);
      setMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getForecastInfo();
  }, []);

  return (
    <div className="latestforecast__container">
      <h2 className="latestforecast__heading">{`Today's Forecast`}</h2>
      <div className="latestforecast__content">
        <p>VIP Forecast - {vipdataList.length} </p>
        <p>Normal Forecast - {normaldataList.length}</p>
        {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
}
