import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "boxicons";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Forecast from "./components/Forecast";
import ChangePassword from "./components/ChangePassword";
// import Navigation from "./pages/Navigation";
// import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      const now = new Date().getTime();
      if (now < expirationTime) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
      }
    }
  };

  const handleLogin = (token) => {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Router>
      <div>
        {/* Render the Navbar only if the user is authenticated */}
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Private routes: Only accessible if authenticated */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/schedule"
            element={isAuthenticated ? <Schedule /> : <Navigate to="/login" />}
          />
          <Route
            path="/forecast"
            element={isAuthenticated ? <Forecast /> : <Navigate to="/login" />}
          />
          <Route
            path="/changepassword"
            element={
              isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
