import { useState } from "react";
import { NavLink } from "react-router-dom";
import policeLogo from "../assets/tnpolicelogo.png";
import "./navbar_style.css";

export default function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close the menu
    }
    if (isUserMenuOpen) setIsUserMenuOpen(false);
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
            style={{ width: "100%" }}
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
        <li className="nav__link nav-link dropdown nav__link__dropdown">
          <NavLink
            to="/profile"
            onClick={toggleUserMenu}
            className="nav__profile__icon"
          >
            {/* Profile
             */}
            <box-icon type="solid" name="user-circle"></box-icon>
          </NavLink>
          {isUserMenuOpen && (
            <ul className="subnav__link__container">
              <li className="subnav__link">
                <NavLink to="/station" onClick={handleLinkClick}>
                  View Station
                </NavLink>
              </li>
              <li className="subnav__link">
                <NavLink to="/changepassword" onClick={handleLinkClick}>
                  Change Password
                </NavLink>
              </li>
              <li className="subnav__link" onClick={onLogout}>
                <NavLink to="/login">Log out</NavLink>
              </li>
            </ul>
          )}
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
