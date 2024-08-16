import "./forecast_style.css";
import { useEffect, useState } from "react";
import Table from "./VipTable";
import NormalTable from "./NormalTable.jsx";
import Loading from "./Loading";
import API_BASE_URL from "../../apiConfig";

export default function Forecast() {
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [searchDate, setSearchDate] = useState(getTodayDate());
  const [vipdataList, setvipDataList] = useState([]);
  const [normaldataList, setnormalDataList] = useState([]);
  const [tableSelect, setTableSelect] = useState("normal");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  const search = async () => {
    setLoading(true);

    const currentDate = new Date(searchDate);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    setnormalDataList([]);
    setvipDataList([]);

    const URL =
      tableSelect === "normal"
        ? `${API_BASE_URL}/normalforecast`
        : `${API_BASE_URL}/vipforecast`;

    const fetchURL = `${URL}?date=${encodeURIComponent(formattedDate)}`;
    console.log(fetchURL);

    try {
      const response = await fetchWithTimeout(fetchURL, {}, 5000);
      const data = await response.json();

      if (data.length === 0 || !data) {
        throw new Error("No data found");
      } else setMessage("");

      console.log(data);

      if (tableSelect === "normal") {
        setnormalDataList(data);
      } else {
        setvipDataList(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (selection) => {
    setTableSelect(selection);
  };

  useEffect(() => {
    search();
  }, [tableSelect]);

  return (
    <div className="forecast__container">
      <div className="header">
        <div className="title">Forecast</div>
        <div className="tableselecter">
          <button
            className={tableSelect === "vip" ? "selected" : ""}
            onClick={() => handleTableSelect("vip")}
          >
            VIP Table
          </button>
          <button
            className={tableSelect === "normal" ? "selected" : ""}
            onClick={() => handleTableSelect("normal")}
          >
            Normal Table
          </button>
        </div>
        <div className="datePicker">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={search}>Search</button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <section className="list">
          {tableSelect === "vip" ? (
            <Table vipdataList={vipdataList} />
          ) : (
            <NormalTable normaldataList={normaldataList} />
          )}
          {message && <p className="display__message">{message}</p>}
        </section>
      )}
    </div>
  );
}
