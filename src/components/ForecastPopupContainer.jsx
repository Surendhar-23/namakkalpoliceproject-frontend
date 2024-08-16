const ForecastPopupContainer = ({ isVisible, onClose, children }) => {
  return (
    <div
      id="popupBox2"
      className={`addforecast__subform ${isVisible ? "d-flex" : "d-none"}`}
    >
      <div className="addforecast__child__container">{children}</div>
    </div>
  );
};

export default ForecastPopupContainer;
