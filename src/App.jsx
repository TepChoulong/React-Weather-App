import React, { useEffect, useState } from "react";
import { getData } from "./js/getData";
import "./styles/App.css";
import searchIcon from "./assets/search.png";
import cloudy from "./assets/cloudy.png";
import clear from "./assets/sunny.png";
import drizzle from "./assets/drizzle.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snowy from "./assets/snowy.png";

function App() {
  const [data, setData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedCity(cityInput);
  };

  useEffect(() => {
    if (submittedCity) {
      getData(cityInput)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [submittedCity]);

  return (
    <div className="App">
      <form id="city-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            id="city-input"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button
            id="submit-input"
            type="submit"
            value={"Submit"}
            onClick={() => {
              const weatherContainer =
                document.querySelector(".weather-container");
              weatherContainer.className = "animated-weather-container"; //animated-weather-container

              setTimeout(() => {
                weatherContainer.className = "weather-container";
              }, 1000);
            }}
          >
            <img src={searchIcon} width={20} height={20} />
          </button>
        </div>
        <div className="weather-container">
          {data && (
            <div id="details">
              <p id="weather-condition">
                {(() => {
                  if (data.weather[0].main == "Clouds") {
                    return <img src={cloudy} width={160} height={160} />;
                  }

                  if (data.weather[0].main == "Clear") {
                    return <img src={clear} width={160} height={160} />;
                  }

                  if (data.weather[0].main == "Drizzle") {
                    return <img src={drizzle} width={160} height={160} />;
                  }

                  if (data.weather[0].main == "Mist") {
                    return <img src={mist} width={160} height={160} />;
                  }

                  if (data.weather[0].main == "Rain") {
                    return <img src={rain} width={160} height={160} />;
                  }

                  if (data.weather[0].main == "Snowy") {
                    return <img src={snowy} width={160} height={160} />;
                  }
                })()}
              </p>
              <p id="temperature">{Math.round(data.main.temp)}℃</p>
              <p id="location">{data.name}</p>
              <div className="row">
                <div className="humidity-container">
                  <h2>Humidity</h2>
                  <p id="humidity">{data.main.humidity}%</p>
                </div>
                <div className="pressure-container">
                  <h2>Pressure</h2>
                  <p id="pressure">{data.main.pressure} Pa</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
