import { useState } from "react";
import PropTypes from "prop-types";
import "./schedule_style.css";
function GovernmentProperty({ governmentProperty }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="h1 my-5">Government Property :</p>
        <button className="btn btn-primary" onClick={toggleEditMode}>
          {isEditMode ? "Save" : "Edit"}
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="paCash" className="form-label">
            PA Cash
          </label>
          <input
            type="text"
            id="paCash"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.PA_Cash || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="rws" className="form-label">
            RWS
          </label>
          <div className="input-group">
            <input
              type="number"
              id="rwsStart"
              className="form-control"
              disabled={!isEditMode}
              value={governmentProperty.RWS ? governmentProperty.RWS.from : ""}
            />
            <span className="input-group-text">to</span>
            <input
              type="number"
              id="rwsEnd"
              className="form-control"
              disabled={!isEditMode}
              value={governmentProperty.RWS ? governmentProperty.RWS.to : ""}
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="bws" className="form-label">
            BWS
          </label>
          <div className="input-group">
            <input
              type="number"
              id="bwsStart"
              className="form-control"
              disabled={!isEditMode}
              value={governmentProperty.BWS ? governmentProperty.BWS.from : ""}
            />
            <span className="input-group-text">to</span>
            <input
              type="number"
              id="bwsEnd"
              className="form-control"
              disabled={!isEditMode}
              value={governmentProperty.BWS ? governmentProperty.BWS.to : ""}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="pistol" className="form-label">
            9mm Pistol
          </label>
          <input
            type="number"
            id="pistol"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.pistol_9mm || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="rounds" className="form-label">
            Rounds
          </label>
          <input
            type="number"
            id="rounds"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.rounds || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="musket" className="form-label">
            410 Musket
          </label>
          <input
            type="number"
            id="musket"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.musket_410 || ""}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="buckshot" className="form-label">
            Buck Shot
          </label>
          <input
            type="number"
            id="buckshot"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.buckShot || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="blank" className="form-label">
            Blank
          </label>
          <input
            type="number"
            id="blank"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.blank || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="dummy" className="form-label">
            Dummy
          </label>
          <input
            type="number"
            id="dummy"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.dummy || ""}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="303Rifle" className="form-label">
            303 Rifle
          </label>
          <input
            type="number"
            id="303Rifle"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.rifle_303 || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="303Rounds" className="form-label">
            303 Rounds
          </label>
          <input
            type="number"
            id="303Rounds"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.rounds_303 || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="Lchain" className="form-label">
            L.Chain
          </label>
          <input
            type="number"
            id="Lchain"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.LChain || ""}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="HandCuff" className="form-label">
            Hand Cuff
          </label>
          <input
            type="number"
            id="HandCuff"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.handCuff || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="eChallan" className="form-label">
            E Challan
          </label>
          <input
            type="number"
            id="eChallan"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.challan || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="W/T" className="form-label">
            W/T
          </label>
          <input
            type="number"
            id="W/T"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.W_T || ""}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <label htmlFor="PumpActionGun" className="form-label">
            Pump Action Gun
          </label>
          <input
            type="number"
            id="PumpActionGun"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.pumpActionGun || ""}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="othersGp" className="form-label">
            Others
          </label>
          <input
            type="text"
            id="othersGp"
            className="form-control"
            disabled={!isEditMode}
            value={governmentProperty.others || ""}
          />
        </div>
      </div>
    </div>
  );
}
GovernmentProperty.propTypes = {
  governmentProperty: PropTypes.shape({
    PA_Cash: PropTypes.number,
    RWS: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
    }),
    BWS: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
    }),
    pistol_9mm: PropTypes.number,
    rounds: PropTypes.number,
    musket_410: PropTypes.number,
    buckShot: PropTypes.number,
    blank: PropTypes.number,
    dummy: PropTypes.number, // This line is crucial for your dummy field
    rifle_303: PropTypes.number,
    rounds_303: PropTypes.number,
    LChain: PropTypes.number,
    handCuff: PropTypes.number,
    challan: PropTypes.number,
    W_T: PropTypes.number,
    pumpActionGun: PropTypes.number,
    others: PropTypes.string, // Assuming others is a string
  }).isRequired,
};

export default GovernmentProperty;
