import { useState } from "react";
import policeLogo from "../assets/tnpolicelogo.png";
import axios from "axios";
import "./login_style.css";
import API_BASE_URL from "../../apiConfig";

export default function Login({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // New state for message type

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName && password) {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          username: userName,
          password,
        });

        const { data } = response;
        console.log("Data", data);

        onLogin(data.token);
        setMessage("Login successful!");
        setMessageType("success");
      } catch (error) {
        console.log(error);

        if (error.response) {
          setMessage(
            error.response.data.error || "Invalid username or password"
          );
        } else {
          setMessage("Login failed. Please try again.");
        }
        setMessageType("error");
      }
    } else {
      setMessage("Please enter both username and password.");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <nav className="nav__bar">
        <div className="logo__container">
          <img src={policeLogo} alt="Police Logo" className="nav__logo" />
          <p className="h1">Namakkal District Police</p>
        </div>
      </nav>

      <div className="login__container">
        <div className="login-box my-2 container-sm">
          <p className="h1 mb-2 mt-2" id="login-title">
            LOGIN
          </p>
          <form onSubmit={handleSubmit} className="h4" id="login-form">
            <div className="user-box mt-5 mb-3">
              <input
                className="fs-2"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <label className="fs-2">Username</label>
            </div>

            <div className="user-box">
              <input
                className="fs-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="fs-2">Password</label>
            </div>
            <button type="submit" id="loginBtn">
              LOGIN
              <span></span>
            </button>
          </form>
          {message && (
            <p className={`message ${messageType}`}>{message}</p> // Apply class based on messageType
          )}
        </div>
      </div>
    </div>
  );
}
