import { useState } from "react";
import { duties, otherDuties } from "../data/duties";
import "bootstrap/dist/css/bootstrap.min.css";

const DutyForm = ({ officer, index, updateSchedule }) => {
  const [dutyType, setDutyType] = useState("");
  const [dutyName, setDutyName] = useState("");
  const [customInput, setCustomInput] = useState("");

  const handleDutyTypeChange = (e) => {
    setDutyType(e.target.value);
    setDutyName("");
    updateScheduleData({
      dutyType: e.target.value,
      dutyName: "",
      customInput: "",
    });
  };

  const handleDutyNameChange = (e) => {
    setDutyName(e.target.value);
    const dutiesRequiringInput = [
      "Bundobust duty-in/out",
      "Special duty",
      "Other station duty",
      "ML",
      "EL",
      "MTL",
    ];
    const requiresInput = dutiesRequiringInput.includes(e.target.value);

    if (!requiresInput) {
      setCustomInput("");
      updateScheduleData({
        dutyType,
        dutyName: e.target.value,
        customInput: "",
      });
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
    updateScheduleData({ dutyType, dutyName, customInput: e.target.value });
  };

  const updateScheduleData = ({ dutyType, dutyName, customInput }) => {
    const dutyDescription = customInput
      ? `${dutyName} - ${customInput}`
      : dutyName;
    updateSchedule(index, officer.name, dutyType, dutyDescription);
  };

  return (
    <div
      className="officers my-3 row"
      data-officer-id={officer.id || `p${index + 1}`}
    >
      <label className="officername h2 ms-2">{officer.name}</label>

      <div className="col-md-12 d-flex flex-column flex-md-row align-items-center">
        <select
          id={`dutytype-${index}`}
          name="dutytype"
          className="dutytype ms-2 form-select form-select-lg"
          value={dutyType}
          onChange={handleDutyTypeChange}
          required
        >
          <option value="" disabled hidden>
            Duty type
          </option>
          <option value="on-duty">On Duty</option>
          <option value="other-duty">Other Duty</option>
        </select>
        {dutyType && (
          <select
            id={`dutyname-${index}`}
            name="dutyname"
            className="dutyname m-2 form-select form-select-lg"
            value={dutyName}
            onChange={handleDutyNameChange}
            required
          >
            <option value="" disabled hidden>
              Select Duty
            </option>
            {(dutyType === "on-duty" ? duties : otherDuties).map((duty) => (
              <option key={duty.value} value={duty.value}>
                {duty.text}
              </option>
            ))}
          </select>
        )}
      </div>
      {dutyName && (
        <div
          id={`custom-input-container-${index}`}
          style={{
            display: [
              "Bundobust duty-in/out",
              "Special duty",
              "Other station duty",
              "ML",
              "EL",
              "MTL",
            ].includes(dutyName)
              ? "block"
              : "none",
          }}
        >
          <input
            type="text"
            id={`custom-input-${index}`}
            name="dutydes"
            className="dutydes mt-2  form-control px-3 py-2 "
            style={{ borderRadius: "5px", fontSize: "14px", color: "#000" }}
            placeholder="Enter details"
            value={customInput}
            onChange={handleCustomInputChange}
            required={[
              "Bundobust duty-in/out",
              "Special duty",
              "Other station duty",
              "ML",
              "EL",
              "MTL",
            ].includes(dutyName)}
          />
        </div>
      )}
    </div>
  );
};

export default DutyForm;
