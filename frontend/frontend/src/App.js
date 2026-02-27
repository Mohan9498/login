import React, { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import StudentDetails from "./details";
import AdminDetails from "./AdminDetails";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "student");

  useEffect(() => {
    if (localStorage.getItem("access")) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("role") || "student");
    }
  }, []);

  const handleLoginSuccess = (data, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  if (isLoggedIn) {
    return userRole === "admin" ? (
      <AdminDetails onLogout={handleLogout} />
    ) : (
      <StudentDetails onLogout={handleLogout} />
    );
  }

  return (
    <div>
      {currentView === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      )}

      {currentView === "register" && (
        <Register
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
    </div>
  );
}

export default App;