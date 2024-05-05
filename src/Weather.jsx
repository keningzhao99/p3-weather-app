import React, { useState, useEffect } from 'react';
import './Weather.css'; // Import CSS file for weather component styling

function Weather({ lat, lon }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const API_KEY = '2db1244558913b2570f9e684a8e3369f';

  useEffect(() => {
    fetchWeatherData();
    fetchHourlyData();
    fetchDailyData();
  }, [lat, lon]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (Array.isArray(data.weather) && data.weather.length > 0) {
        setCurrentWeather(data.weather[0]);
      } else {
        console.error('Weather data not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchHourlyData = async () => {
    try {
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (Array.isArray(data.list) && data.list.length > 0) {
        setHourlyData(data.list);
      } else {
        console.error('Hourly data not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDailyData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}`
      );
      const data = await response.json();

      if (Array.isArray(data.list) && data.list.length > 0) {
        setDailyData(data.list);
      } else {
        console.error('Daily data not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="weather-container">
      {/* Current weather display */}
      <div className="current-weather">
        <h2>Current weather</h2>
        {currentWeather && (
          <>
            <p>Weather Status: {currentWeather.main}</p>
            <p>Description: {currentWeather.description}</p>
            {currentWeather.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
          </>
        )}
      </div>

      {/* Hourly forecast display */}
      <div className="hourly-forecast">
        <h2>Hourly forecast for next day</h2>
        {/* Display hourly forecast */}
        {hourlyData.map((item, index) => (
          <div key={index}>
            <p>Time: {item.dt_txt}</p>
            <p>Weather Status: {item.weather[0].main}</p>
            <p>Description: {item.weather[0].description}</p>
            {item.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Hourly Weather Icon"
              />
            )}
          </div>
        ))}
      </div>

      {/* Daily forecast display */}
      <div className="daily-forecast">
        <h2>Daily forecast for the next week</h2>
        {/* Display daily forecast */}
        {dailyData.map((item, index) => (
          <div key={index}>
            <p>Date: {item.dt}</p>
            <p>Weather Status: {item.weather[0].main}</p>
            <p>Description: {item.weather[0].description}</p>
            {item.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Daily Weather Icon"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
