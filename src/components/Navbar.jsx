import { useState } from "react";
import { NavLink } from "react-router-dom";
import policeLogo from "../assets/tnpolicelogo.png";
import "./navbar_style.css";

export default function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close the menu
    }
  };

  return (
    <nav className="nav__bar">
      <div className="logo__container">
        <img src={policeLogo} alt="Police Logo" className="nav__logo" />
        <h2 className="nav__text">Namakkal District Police</h2>
      </div>
      <ul className={`nav__container ${isMenuOpen ? "open" : ""}`}>
        <li className="nav__link">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Home
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink
            to="/schedule"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Schedule
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink
            to="/forecast"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Forecast
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink
            to="/navigation"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Navigation
          </NavLink>
        </li>
        <li className="nav__link nav-link dropdown">
          <NavLink
            to="/profile"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Profile
          </NavLink>
        </li>
      </ul>
      <div className="menu__btn" onClick={toggleMenu}>
        {isMenuOpen ? (
          <box-icon name="x"></box-icon> // Close icon
        ) : (
          <box-icon name="menu"></box-icon> // Menu icon
        )}
      </div>
    </nav>
  );
}
