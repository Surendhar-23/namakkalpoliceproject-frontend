import { useState } from "react";
import OfficersList from "./OfficersList";
import StationPropertyList from "./StationPropertyList";
import "./viewstation_style.css";

export default function ViewStation() {
  const [selectedOption, setSelectedOption] = useState("Offices");

  const renderContent = () => {
    switch (selectedOption) {
      case "Offices":
        return <OfficersList />;
      case "Properties":
        return <StationPropertyList />;
      default:
        return <div>Select an option from the side navigation.</div>;
    }
  };

  return (
    <div className="station__container">
      <aside className="station__sidenav">
        <ul className="station__sidenav__container">
          <li
            className={`sidenav__list ${
              selectedOption === "Offices" ? "active_sidenav" : ""
            }`}
            onClick={() => setSelectedOption("Offices")}
          >
            Officers
          </li>
          <li
            className={`sidenav__list ${
              selectedOption === "Properties" ? "active_sidenav" : ""
            }`}
            onClick={() => setSelectedOption("Properties")}
          >
            Properties
          </li>
        </ul>
      </aside>
      <main className="station__main">{renderContent()}</main>
    </div>
  );
}
