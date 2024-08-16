import PropTypes from "prop-types";
import "./schedule_style.css";
function StationDetails({ stationDetails }) {
  // Providing default empty objects if any of these are undefined
  const sanctionedStrength = stationDetails.sanctionedStrength || {};
  const actualStrength = stationDetails.actualStrength || {};
  const shortageStrength = stationDetails.shortageStrength || {};
  const excessStrength = stationDetails.excessStrength || {};

  return (
    <div className="container mt-4">
      <h1>Station Details :</h1>
      <table className="table table-bordered table-striped table-light table-hover border-dark my-4">
        <thead>
          <tr>
            <th>Strength Particulars</th>
            <th>Insp</th>
            <th>SI</th>
            <th>W SI</th>
            <th>SSI</th>
            <th>HC</th>
            <th>GR-I</th>
            <th>GR-II</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="h6">Sanctioned Strength</td>
            <td>{sanctionedStrength.Insp || 0}</td>
            <td>{sanctionedStrength.SI || 0}</td>
            <td>{sanctionedStrength.WSI || 0}</td>
            <td>{sanctionedStrength.SSI || 0}</td>
            <td>{sanctionedStrength.HC || 0}</td>
            <td>{sanctionedStrength.GR_I || 0}</td>
            <td>{sanctionedStrength.GR_II || 0}</td>
            <td>
              {Object.values(sanctionedStrength).reduce((a, b) => a + b, 0)}
            </td>
          </tr>
          <tr>
            <td className="h6">Actual Strength</td>
            <td>{actualStrength.Insp || 0}</td>
            <td>{actualStrength.SI || 0}</td>
            <td>{actualStrength.WSI || 0}</td>
            <td>{actualStrength.SSI || 0}</td>
            <td>{actualStrength.HC || 0}</td>
            <td>{actualStrength.GR_I || 0}</td>
            <td>{actualStrength.GR_II || 0}</td>
            <td>{Object.values(actualStrength).reduce((a, b) => a + b, 0)}</td>
          </tr>
          <tr>
            <td className="h6">Shortage Strength</td>
            <td>{shortageStrength.Insp || 0}</td>
            <td>{shortageStrength.SI || 0}</td>
            <td>{shortageStrength.WSI || 0}</td>
            <td>{shortageStrength.SSI || 0}</td>
            <td>{shortageStrength.HC || 0}</td>
            <td>{shortageStrength.GR_I || 0}</td>
            <td>{shortageStrength.GR_II || 0}</td>
            <td>
              {Object.values(shortageStrength).reduce((a, b) => a + b, 0)}
            </td>
          </tr>
          <tr>
            <td className="h6">Excess Strength</td>
            <td>{excessStrength.Insp || 0}</td>
            <td>{excessStrength.SI || 0}</td>
            <td>{excessStrength.WSI || 0}</td>
            <td>{excessStrength.SSI || 0}</td>
            <td>{excessStrength.HC || 0}</td>
            <td>{excessStrength.GR_I || 0}</td>
            <td>{excessStrength.GR_II || 0}</td>
            <td>{Object.values(excessStrength).reduce((a, b) => a + b, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

StationDetails.propTypes = {
  stationDetails: PropTypes.shape({
    sanctionedStrength: PropTypes.shape({
      Insp: PropTypes.number,
      SI: PropTypes.number,
      WSI: PropTypes.number,
      SSI: PropTypes.number,
      HC: PropTypes.number,
      GR_I: PropTypes.number,
      GR_II: PropTypes.number,
    }),
    actualStrength: PropTypes.shape({
      Insp: PropTypes.number,
      SI: PropTypes.number,
      WSI: PropTypes.number,
      SSI: PropTypes.number,
      HC: PropTypes.number,
      GR_I: PropTypes.number,
      GR_II: PropTypes.number,
    }),
    shortageStrength: PropTypes.shape({
      Insp: PropTypes.number,
      SI: PropTypes.number,
      WSI: PropTypes.number,
      SSI: PropTypes.number,
      HC: PropTypes.number,
      GR_I: PropTypes.number,
      GR_II: PropTypes.number,
    }),
    excessStrength: PropTypes.shape({
      Insp: PropTypes.number,
      SI: PropTypes.number,
      WSI: PropTypes.number,
      SSI: PropTypes.number,
      HC: PropTypes.number,
      GR_I: PropTypes.number,
      GR_II: PropTypes.number,
    }),
  }),
};

export default StationDetails;
