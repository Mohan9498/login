import React, { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import StudentDetails from "./details";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  useEffect(() => {
    if (localStorage.getItem("access")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  if (isLoggedIn) {
    return <StudentDetails onLogout={handleLogout} />;
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