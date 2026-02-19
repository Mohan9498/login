import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();


const token = localStorage.getItem("token");

fetch("http://127.0.0.1:8000/api/token/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "your_actual_username",
    password: "your_actual_password"
  })
})
