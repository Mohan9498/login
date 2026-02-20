import React, { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import "./login.css";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("access");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setUsername(data.username);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    setCurrentView("login");
  };

  const handleSwitchToLogin = () => {
    setCurrentView("login");
  };

  const handleSwitchToRegister = () => {
    setCurrentView("register");
  };

  // Dashboard view (shown after successful login)
  if (isAuthenticated) {
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <p className="success-message">You are now logged in.</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    );
  }

  // Render the appropriate view
  return (
    <div>
      {currentView === "login" && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {currentView === "register" && (
        <Register onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default App;
