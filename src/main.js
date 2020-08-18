import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.viewElems = {};
    this.dayCount = 0;
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMEElements();
    this.setupListeners();
  };

  connectDOMEElements = () => {
    const listOfIds = Array.from(document.querySelectorAll("[id]")).map((elem) => elem.id);
    this.viewElems = mapListToDOMElements(listOfIds);
  };

  setupListeners = () => {
    this.viewElems.searchInput.addEventListener("keyup", this.handleSubmit);
    this.viewElems.searchButton.addEventListener("click", this.handleSubmit);
    this.viewElems.returnToSearchBtn.addEventListener("click", this.returnToSearch);
  };

  handleSubmit = (e) => {
    if (e.type == "click" || e.key === "Enter") {
      this.fadeInOut();
      let query = this.viewElems.searchInput.value;
      getWeatherByCity(query)
        .then((data) => {
          this.displayWeatherData(data);
          this.viewElems.searchInput.style.borderColor = "black";
          this.viewElems.errInfo.style.display = "none";
        })
        .catch(() => {
          this.fadeInOut();
          this.viewElems.searchInput.style.borderColor = "red";
          this.viewElems.errInfo.style.display = "block";
        });
    }
  };

  fadeInOut = () => {
    if (this.viewElems.mainContainer.style.opacity === "1" || this.viewElems.mainContainer.style.opacity === "") {
      this.viewElems.mainContainer.style.opacity = "0";
    } else {
      this.viewElems.mainContainer.style.opacity = "1";
    }
  };

  switchView = () => {
    if (this.viewElems.weatherSearchView.style.display !== "none") {
      this.viewElems.weatherSearchView.style.display = "none";
      this.viewElems.weatherForecastView.style.display = "block";
    } else {
      this.viewElems.weatherSearchView.style.display = "flex";
      this.viewElems.weatherForecastView.style.display = "none";
    }
  };

  returnToSearch = () => {
    this.fadeInOut();
    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
    }, 500);
  };

  displayWeatherData = (data) => {
    this.switchView();
    this.fadeInOut();
    const weather = data.consolidated_weather[this.dayCount];
    this.viewElems.weatherCity.innerText = data.title;
    this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElems.weatherIcon.alt = weather.weather_state_name;

    const weatherStateName = weather.weather_state_name;
    const currTemp = weather.the_temp.toFixed();
    const maxTemp = weather.max_temp.toFixed();
    const minTemp = weather.min_temp.toFixed();
    const airPressure = weather.air_pressure.toFixed();
    const humidity = weather.humidity.toFixed();
    const windSpeed = weather.wind_speed.toFixed();
    const valueOfRotate = weather.wind_direction.toFixed();
    const weatherDate = weather.applicable_date;

    this.viewElems.weatherStateName.innerText = `${weatherStateName}`;
    this.viewElems.weatherCurrentTemp.innerText = `${currTemp}°C`;
    this.viewElems.weatherMaxTemp.innerText = `${maxTemp}°C`;
    this.viewElems.weatherMinTemp.innerText = `${minTemp}°C`;
    this.viewElems.airPressure.innerText = `${airPressure}hPa`;
    this.viewElems.humidity.innerText = `${humidity}%`;
    this.viewElems.windSpeed.innerText = `${windSpeed}km/h`;
    this.viewElems.windArrow.style.transform = `rotate(${valueOfRotate}deg)`;
    this.viewElems.weatherDate.innerText = weatherDate;
  };
}

window.addEventListener("DOMContentLoaded", new WeatherApp());
