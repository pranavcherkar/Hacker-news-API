import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Headers = ({ onSearch }) => {
  const [date, setDate] = useState(new Date());
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    onSearch(query);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherData(latitude, longitude);
        });
      }
    };

    // Function to fetch weather data from the OpenWeather API
    const fetchWeatherData = (latitude, longitude) => {
      const apiKey = "eff8c965bf27fa7738599df09e995594"; // Replace with your OpenWeather API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data: " + error);
        });
    };

    getLocation();
  }, []);
  const formatTemperature = (kelvinTemp) => {
    const celsiusTemp = kelvinTemp - 273.15;
    return celsiusTemp.toFixed(0).padStart(2, "0");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark text-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" href="#">
          Hacker News
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-light active "
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
          </ul>
          <div className="text-center d-flex  ">
            {weatherData && (
              <p className="text-center tempcss">
                {formatTemperature(weatherData.main.temp)}&deg;C
              </p>
            )}
            <p
              className="text-center font-weight-bold datecss"
              aria-current="page"
              href="#"
            >
              {date.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
