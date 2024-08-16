import { useEffect, useState } from "react";
import VipForecastForm from "./VipForecastForm";
import NormalForecastForm from "./NormalForecastForm";
import img from "../assets/close.webp";
import "./addforecastpopup_style.css";
import ForecastPopupContainer from "./ForecastPopupContainer";

export default function ForecastPopup({ onCloseClick }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [formType, setFormType] = useState("");

  useEffect(() => {
    if (!isPopupVisible) return;
  }, isPopupVisible);

  const openPopup = (type) => {
    setFormType(type);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setFormType("");
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    if (value === "none") {
      setPopupVisible(false);
      setFormType("");
    } else {
      openPopup(value);
    }
  };

  return (
    <div className="popup">
      <div className="forecast popupBox container-md overflow-auto ">
        <button className="closeBtn" onClick={onCloseClick}>
          <img src={img} alt="Close" />
        </button>
        <h1 className="head">Forecast</h1>
        <div className="formSection">
          <div className="addforecastsection">
            <label htmlFor="typeoption" className="label">
              Types of Forecast
            </label>
            <select
              className="forecast__type__select"
              onChange={handleDropdownChange}
              value={formType}
            >
              <option value="none"> --Select option--</option>
              <option value="vip">VIP visit</option>
              <option value="normal">Common Forecast</option>
            </select>
          </div>
          <ForecastPopupContainer
            isVisible={isPopupVisible}
            onClose={closePopup}
          >
            {formType === "vip" && <VipForecastForm onClose={onCloseClick} />}
            {formType === "normal" && (
              <NormalForecastForm onClose={onCloseClick} />
            )}
          </ForecastPopupContainer>
        </div>
      </div>
    </div>
  );
}
