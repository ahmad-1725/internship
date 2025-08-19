import React from "react";
import '../assets/styles.css'

function WeatherCard({ weatherData }) {
  const {
    city = "Unknown City", temp = "-", description = "No description", iconCode = "01d", feelsLike,
    humidity, pressure, windSpeed, visibility, sunrise, sunset
  } = weatherData || {};
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  const formatTime = (unixTime) =>
    new Date(unixTime * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
  console.log("Feels Like:" ,feelsLike)
  return (
    <div className="weatherCard">
      <div className="badge">{weatherData.weatherType || 'Today'}</div>
      <img className="icon" src={iconURL} alt={`${weatherData.description} icon`} />
      <h1 className="cityName">{city}</h1>
      <h3 className="temp">{temp}</h3>
      <p className="description">{description}</p>
      <div className="details">
        <p>Feels like: {feelsLike}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
        <p>Wind: {windSpeed} m/s</p>
        <p>Visibility: {visibility / 1000} km</p>
      </div>
    </div>
  )
}

export default WeatherCard;