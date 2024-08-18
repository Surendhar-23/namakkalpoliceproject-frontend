import PoliceDutyList from "./PoliceDutyList";
import "./AddDutyPopup_style.css";

export default function AddDutyPopup({ onCloseClick }) {
  return (
    <div className="popup" style={{ zIndex: 10 }}>
      <div
        className="popupBox container-md my-5 p-5 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <p className="h1 mb-5 text-center">Police Duty</p>
        <PoliceDutyList onCloseClick={onCloseClick} />
      </div>
    </div>
  );
}
