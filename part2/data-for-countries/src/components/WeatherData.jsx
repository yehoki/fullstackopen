import React from "react";
import { useEffect, useState } from "react";
import getCityWeather from "../services/weather";

export const WeatherData = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const capital = props.capital[0];
  useEffect(() => {
    getCityWeather(capital).then((res) => {
      setWeatherData(res.data);
    });
  }, []);

  console.log(weatherData);
  return (
    <>
      {weatherData.location ? (
        <div>
          <h2>Weather in {capital}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <div>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
          </div>
          <p>Wind: {weatherData.current.wind_kph} km/h</p>
        </div>
      ) : null}
    </>
  );
};
