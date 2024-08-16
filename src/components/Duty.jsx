import { useState, useEffect } from "react";
import Loading from "./Loading";
import API_BASE_URL from "../../apiConfig";

function Duty() {
  const [policeDuty, setpoliceDuty] = useState([]);
  const [searchDate, setSearchDate] = useState(getTodayDate());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  const search = async () => {
    setpoliceDuty([]);
    setLoading(true);
    const currentDate = new Date(searchDate);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const URL = `${API_BASE_URL}/duty`;
    const fetchURL = `${URL}?date=${encodeURIComponent(formattedDate)}`;
    console.log(fetchURL);

    try {
      const response = await fetchWithTimeout(fetchURL, {}, 5000);
      const data = await response.json();

      if (data.length === 0 || !data) {
        throw new Error("No data found");
      } else setMessage("");
      setpoliceDuty(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Duty :</h1>
      <div className="datePicker">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      {loading ? (
        <Loading /> // Loading screen
      ) : (
        <table className="table table-bordered table-striped table-light table-hover border-dark my-4">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Mode</th>
              <th>Duty</th>
            </tr>
          </thead>
          <tbody className="h6">
            {policeDuty.length > 0 ? (
              policeDuty.map((element, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.mode}</td>
                  <td>{element.duty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{message}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Duty;
