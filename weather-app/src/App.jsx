import React,{ useState, useEffect } from "react";
import ForecastList from "./Components/ForecastList";
import LoadingSpinner from "./Components/LoadingSpinner";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import useWeatherApi from "./hooks/useWeatherApi";

function App() {
  const [loading, setLoading] = useState(true);
  const [city,setCity] = useState('Islamabad');

  const {
    weatherData,
    forecastArray,
    isLoading,
    error,
    fetchWeather,
    fetchWeatherByCoords
  } = useWeatherApi();

  useEffect (() =>{
    fetchWeather('Islamabad');
  }, []);

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation error:" ,error);
          fetchWeather("Islamabad");
        }
      );
    } else{
      fetchWeather("Islamabad");
    }
  }, []);

  const searchCity = (searchTerm) => {
    if(!searchTerm.trim()) return;
    setCity(searchTerm);
    fetchWeather(searchTerm);
  }
  

  return (
    <div className="container">
      <SearchBar searchCity={searchCity} />
      { isLoading && <LoadingSpinner /> }
      { error && <p className="error">{error}</p> }
      { weatherData && <WeatherCard weatherData={weatherData} /> }
      { forecastArray.length > 0 && <ForecastList forecastArray = {forecastArray} /> }
    </div>
  );
}

export default App;
