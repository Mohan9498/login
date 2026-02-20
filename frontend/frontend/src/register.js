import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        {
          username: username.trim(),
          password: password,
          confirm_password: confirmPassword,
        }
      );

      setSuccess("Registration successful! Please login.");
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const formattedErrors = {};
        
        // Flatten nested error objects
        Object.keys(errorData).forEach(key => {
          if (Array.isArray(errorData[key])) {
            formattedErrors[key] = errorData[key][0];
          } else if (typeof errorData[key] === 'object') {
            Object.keys(errorData[key]).forEach(subKey => {
              formattedErrors[subKey] = errorData[key][subKey];
            });
          } else {
            formattedErrors[key] = errorData[key];
          }
        });
        
        setErrors(formattedErrors);
      } else {
        setErrors({ general: "Server error. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {success && <p className="success-message">{success}</p>}
      
      {errors.general && <p className="error-message">{errors.general}</p>}

      <form onSubmit={handleRegister}>
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="link-button">
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;
