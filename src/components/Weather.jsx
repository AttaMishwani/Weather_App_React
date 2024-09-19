import React, { useEffect, useRef, useState } from "react";
import "./css/Weather.css";
import { BsSearch } from "react-icons/bs";
import clear_icon from "../assets/imgs/clear.png";
import cloud_icon from "../assets/imgs/cloud.png";
import drizzle_icon from "../assets/imgs/drizzle.png";
import rain_icon from "../assets/imgs/rain.png";
import snow_icon from "../assets/imgs/snow.png";
import wind_icon from "../assets/imgs/wind.png";
import humidity_icon from "../assets/imgs/humidity.png";
// import VITE_API_KEY from "../../env";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const cityNameRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03n": cloud_icon,
    "03d": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09n": rain_icon,
    "09d": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13n": snow_icon,
    "13d": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter city name!!");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
      cityNameRef.current.value = "";
    } catch (error) {
      setWeatherData(false);
    }
  };

  useEffect(() => {
    search("karachi");
  }, []);

  return (
    <div className="weather  shadow-black shadow-2xl place-self-center flex  justify-center rounded-lg p-4 items-center flex-col">
      <div className="search-bar flex items-center gap-3">
        <input
          type="text"
          ref={cityNameRef}
          className="border-none outline-none text-black rounded-xl pl-3 h-9"
          placeholder="Search"
          name=""
          id=""
        />
        <BsSearch
          onClick={() => search(cityNameRef.current.value)}
          className="cursor-pointer shadow-sm shadow-black text-black bg-white rounded-full text-4xl p-1.5 h-9 w-9 "
        />
      </div>
      {weatherData ? (
        <>
          {" "}
          <img
            src={weatherData.icon}
            className="weather-icon w-[180px]"
            alt=""
          />
          <p className="temperature text-white text-5xl mb-2">
            {weatherData.temperature}°c
          </p>
          <p className="location text-white text-xl">{weatherData.location}</p>
          <div className="weather-data flex justify-between w-full mt-7">
            <div className="col flex flex-col items-center">
              <img src={humidity_icon} className="mb-2" alt="" />
              <p className="text-white">{weatherData.humidity}%</p>
              <span className="text-white">Humidity</span>
            </div>
            <div className="col col flex flex-col items-center">
              <img src={wind_icon} className="mb-2" alt="" />
              <p className="text-white">{weatherData.windSpeed} km/h</p>
              <span className="text-white">Wind</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
