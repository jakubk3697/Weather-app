import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

const viewElems = {};

class WeatherApp {
  constructor() {
    this.viewElems = {};
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
      getWeatherByCity(query).then((data) => {
        this.displayWeatherData(data);
        this.switchView();
        this.fadeInOut();
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
    const weather = data.consolidated_weather[0];
    console.log(data);
    this.viewElems.weatherCity.innerText = data.title;
    this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElems.weatherIcon.alt = weather.weather_state_name;

    const currTemp = weather.the_temp.toFixed(2);
    const maxTemp = weather.max_temp.toFixed(2);
    const minTemp = weather.min_temp.toFixed(2);

    this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}`;
    this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}`;
    this.viewElems.weatherMinTemp.innerText = `Min temperature ${minTemp}`;
  };
}

window.addEventListener("DOMContentLoaded", new WeatherApp());
