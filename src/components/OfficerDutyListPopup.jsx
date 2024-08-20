import PieChart from "./PieChart";

const OfficerDutyListPopup = ({ show, handleClose, officer }) => {
  const duties = officer?.duties;
  if (!show || !duties) return null; // Prevents rendering the modal if not shown

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Officer Duty List</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
              style={{
                border: "none",
                background: "transparent",
                position: "absolute",
                right: "10px",
                top: "10px",
              }} // Ensure button is at the top-right corner
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <h4 className="text-primary">{officer.name}</h4>
              <p className="text-secondary">
                <strong>ID:</strong> {officer.id}
              </p>
            </div>
            {duties?.length === 0 ? (
              <p>No duties found.</p>
            ) : (
              <>
                <h5 className="mb-3">Duties</h5>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Mode</th>
                      <th>Duty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duties.map((duty) => (
                      <tr key={duty._id}>
                        <td>{new Date(duty.date).toLocaleDateString()}</td>
                        <td>{duty.mode}</td>
                        <td>{duty.duty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {duties && <PieChart data={duties} />}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDutyListPopup;
