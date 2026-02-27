import React, { useEffect, useState } from "react";
import "./admin.css";

function AdminDetails({ onLogout }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="layout">
      {/* TOP NAVBAR */}
      <div className="navbar">
        <div className="navbar-left">
          <h2 className="logo">Admin Portal</h2>
        </div>

        <div className="navbar-right">
          <div className="user-avatar-small">
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="main-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="menu">
            <div className="menu-item active">Dashboard</div>
            <div className="menu-item">Users</div>
            <div className="menu-item">Reports</div>
          </div>

          {/* Bottom Section */}
          <div className="sidebar-bottom">
            <div className="student-info">
              <div className="student-avatar">
                {username?.charAt(0).toUpperCase()}
              </div>
              <div className="student-details">
                <div className="student-name">{username}</div>
              </div>
            </div>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </aside>
        <br />
        <br />
        <br />
        {/* CONTENT */}
        <div className="content">
          <div className="content-header">
            <h1>Welcome, {username}</h1>
            <p>This is your admin dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetails;
