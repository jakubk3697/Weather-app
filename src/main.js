import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.viewElems = {};
    this.dayCount = 0;
    this.obj = {};
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

    this.viewElems.prevDay.addEventListener("click", this.displayAnotherWeather);
    this.viewElems.nextDay.addEventListener("click", this.displayAnotherWeather);
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
      this.viewElems.nextDay.style.display = "block";
      this.viewElems.prevDay.style.display = "block";
    } else {
      this.viewElems.weatherSearchView.style.display = "flex";
      this.viewElems.weatherForecastView.style.display = "none";
      this.viewElems.nextDay.style.display = "none";
      this.viewElems.prevDay.style.display = "none";
    }
  };

  returnToSearch = () => {
    this.dayCount = 0;
    this.fadeInOut();
    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
    }, 500);
  };

  displayWeatherData = (data) => {
    this.switchView();
    this.fadeInOut();

    const { weather_state_name, the_temp, max_temp, min_temp, air_pressure, humidity, wind_speed, wind_direction, applicable_date } = data.consolidated_weather[this.dayCount];

    const weather = data.consolidated_weather[this.dayCount];
    this.viewElems.weatherCity.innerText = data.title;
    this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElems.weatherIcon.alt = weather.weather_state_name;

    this.viewElems.weatherStateName.innerText = `${weather_state_name}`;
    this.viewElems.weatherCurrentTemp.innerText = `${the_temp.toFixed()}°C`;
    this.viewElems.weatherMaxTemp.innerText = `${max_temp.toFixed()}°C`;
    this.viewElems.weatherMinTemp.innerText = `${min_temp.toFixed()}°C`;
    this.viewElems.airPressure.innerText = `${air_pressure.toFixed()}hPa`;
    this.viewElems.humidity.innerText = `${humidity.toFixed()}%`;
    this.viewElems.windSpeed.innerText = `${wind_speed.toFixed()}km/h`;
    this.viewElems.windArrow.style.transform = `rotate(${wind_direction}deg)`;
    this.viewElems.weatherDate.innerText = applicable_date;
  };

  displayAnotherWeather = () => {
    const itemKey = event.target.closest("button").id;

    if (itemKey === "nextDay") {
      this.dayCount++;
    } else if (itemKey === "prevDay") {
      this.dayCount--;
    }

    let query = this.viewElems.searchInput.value;
    getWeatherByCity(query).then((data) => {
      this.displayWeatherData(data);
      this.switchView();
    });
    this.fadeInOut();

    if (this.dayCount <= 0) {
      this.viewElems.prevDay.disabled = true;
      this.viewElems.nextDay.disabled = false;
    } else if (this.dayCount >= 5) {
      this.viewElems.prevDay.disabled = false;
      this.viewElems.nextDay.disabled = true;
    } else {
      this.viewElems.prevDay.disabled = false;
      this.viewElems.nextDay.disabled = false;
    }
  };
}

window.addEventListener("DOMContentLoaded", new WeatherApp());
