import "./homebox_style.css";
import "boxicons";
export default function Homebox({
  iconName,
  title,
  des,
  btnText,
  todayStatusNotCompleted,
  onButtonClick,
}) {
  return (
    <div className="home__box">
      <div className="home__box__icon">
        <box-icon color="#fff" name={iconName}></box-icon>
      </div>
      <div className="home__box__content">
        <h3>{title}</h3>
        <p>{des}</p>
        <button onClick={onButtonClick}>{btnText}</button>
      </div>
      {todayStatusNotCompleted && (
        <div
          className="submit__notification"
          title="Tomorrow duty is not assigned yet"
        >
          <box-icon
            name="calendar-exclamation"
            className="submit__notification__icon"
          ></box-icon>
        </div>
      )}
    </div>
  );
}
