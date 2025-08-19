import React from "react";
import "../assets/styles.css";

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
