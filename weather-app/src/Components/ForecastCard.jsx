import React from "react";
import { useState } from "react";

function ForecastCard({ forecastData }) {
  const {
    day = "Not Available", minTemp = "0", maxTemp = "0", description = "No description", iconCode = "01d"
  } = forecastData || {};

  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div className="forecastCard">
      <h3 className="day">{day}</h3>
      <img className="icon" src={iconURL} alt={`${description} icon`} />
      <div className="temp">
        <span className="minTemp">Min: {minTemp}</span><br />
        <span className="maxTemp">Max: {maxTemp}</span>
      </div>
      <p className="description">{description}</p>
    </div>
  )
}

export default ForecastCard;