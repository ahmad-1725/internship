export const API_KEY = '753948dda03625e12983ae1fc9babfe0';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeatherUrl = (city) => 
  `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`

export const getForecastUrl = (city) => 
  `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`

export const getWeatherByCoordsUrl = (lat, lon) =>
  `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
