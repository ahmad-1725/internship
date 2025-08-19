import { useState } from "react";
import{
  getCurrentWeatherUrl,
  getForecastUrl,
  getWeatherByCoordsUrl
} from '../config';

function useWeatherApi() {

  const [weatherData, setWeatherData] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) =>{
    setIsLoading(true);
    setError(null);

    try{
      const weatherRes = await fetch(getCurrentWeatherUrl(cityName));
      
      if(!weatherRes.ok) {
        throw new Error("City not found");
      }
      const weatherJson = await weatherRes.json();
      
      const forecastRes = await fetch(getForecastUrl(cityName));
      if(!forecastRes.ok){
        throw new Error("Could not load forecast");
      }

      const forecastJson = await forecastRes.json();
      
      setWeatherData(
        {
          city: weatherJson.name,
          temp: Math.round(weatherJson.main.temp),
          description: weatherJson.weather[0].description,
          iconCode: weatherJson.weather[0].icon,
          weatherType: weatherJson.weather[0].main,
          feelsLike: Math.round(weatherJson.main.feels_like),
          humidity: weatherJson.main.humidity,
          pressure: weatherJson.main.pressure,
          windSpeed: weatherJson.wind.speed,
          visibility: weatherJson.visibility,
          sunrise: weatherJson.sys.sunrise,
          sunset: weatherJson.sys.sunset
        }
      );      
      // Helper to get daily data (e.g. one forecast per day, closest to midday)
      const dailyData = {};
      forecastJson.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; // Get "YYYY-MM-DD"
        const hour = item.dt_txt.split(" ")[1]; // Get "HH:MM:SS"

        // Keep only one entry per day, ideally near 12:00
        if (!dailyData[date] || hour === "12:00:00") {
          dailyData[date] = item;
        }
      });

      const dailyForecast = Object.values(dailyData)
        .slice(0, 3)
        .map((item) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          iconCode: item.weather[0].icon,
          description: item.weather[0].description,
        }));
      setForecastArray(dailyForecast);

    } catch(err){
      setError(err.message);
      setWeatherData(null);
      setForecastArray([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError(null);

    try{
      const weatherRes = await fetch(getWeatherByCoordsUrl(lat,lon));
      
      if(!weatherRes.ok){
        throw new Error("Could not get location weather");
      }

      const weatherJson = await weatherRes.json();
      const cityName = weatherJson.name;

      await fetchWeather(cityName);
    } catch(err){
      setError("Failed to get location weather");
    } finally{
      setIsLoading(false);
    }
  };
    return{
    weatherData,
    forecastArray,
    isLoading,
    error,
    fetchWeather,
    fetchWeatherByCoords
  };

}

export default useWeatherApi;