import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          username: username.trim(),
          password: password,
        }
      );

      // Store tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("username", response.data.username);

      // Call parent component's login success handler
      if (onLoginSuccess) {
        onLoginSuccess(response.data);
      }

    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.detail) {
          setErrors({ general: errorData.detail });
        } else {
          // Handle serializer errors
          const formattedErrors = {};
          Object.keys(errorData).forEach(key => {
            if (Array.isArray(errorData[key])) {
              formattedErrors[key] = errorData[key][0];
            } else {
              formattedErrors[key] = errorData[key];
            }
          });
          setErrors(formattedErrors);
        }
      } else {
        setErrors({ general: "Server error. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {errors.general && <p className="error-message">{errors.general}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={errors.username ? "input-error" : ""}
        />
        {errors.username && <span className="error-text">{errors.username}</span>}
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="switch-text">
        Don't have an account?{" "}
        <button onClick={onSwitchToRegister} className="link-button">
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;
