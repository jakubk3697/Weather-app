import { getWeatherByCity } from "./apiService.js";

const viewElems = {};

const getDOMelem = (id) => {
  return document.getElementById(id);
};

const connectDOMElems = () => {
  viewElems.mainContainer = getDOMelem("mainContainer");
  viewElems.weatherSearchView = getDOMelem("weatherSearchView");
  viewElems.weatherForecastView = getDOMelem("weatherForecastView");

  viewElems.searchInput = getDOMelem("searchInput");
  viewElems.searchButton = getDOMelem("searchButton");

  viewElems.weatherCity = getDOMelem("weatherCity");
  viewElems.weatherIcon = getDOMelem("weatherIcon");

  viewElems.weatherCurrentTemp = getDOMelem("weatherCurrentTemp");
  viewElems.weatherMaxTemp = getDOMelem("weatherMaxTemp");
  viewElems.weatherMinTemp = getDOMelem("weatherMinTemp");

  viewElems.returnToSearchBtn = getDOMelem("returnToSearchBtn");
};

const setupListeners = () => {
  viewElems.searchInput.addEventListener("keyup", onEnterSubmit);
  viewElems.searchButton.addEventListener("click", onClickSubmit);
  viewElems.returnToSearchBtn.addEventListener("click", returnToSearch);
};

const initializeApp = () => {
  connectDOMElems();
  setupListeners();
};

const onEnterSubmit = (e) => {
  if (e.key === "Enter") {
    fadeInOut();
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then((data) => {
      displayWeatherData(data);
      switchView();
      fadeInOut();
    });
  }
};
const onClickSubmit = () => {
  fadeInOut();
  let query = viewElems.searchInput.value;
  getWeatherByCity(query).then((data) => {
    displayWeatherData(data);
    switchView();
    fadeInOut();
  });
};

const displayWeatherData = (data) => {
  const weather = data.consolidated_weather[0];
  console.log(data);
  viewElems.weatherCity.innerText = data.title;
  viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
  viewElems.weatherIcon.alt = weather.weather_state_name;

  const currTemp = weather.the_temp.toFixed(2);
  const maxTemp = weather.max_temp.toFixed(2);
  const minTemp = weather.min_temp.toFixed(2);

  viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}`;
  viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}`;
  viewElems.weatherMinTemp.innerText = `Min temperature ${minTemp}`;
};

const fadeInOut = () => {
  if (viewElems.mainContainer.style.opacity === "1" || viewElems.mainContainer.style.opacity === "") {
    viewElems.mainContainer.style.opacity = "0";
  } else {
    viewElems.mainContainer.style.opacity = "1";
  }
};

const switchView = () => {
  if (viewElems.weatherSearchView.style.display !== "none") {
    viewElems.weatherSearchView.style.display = "none";
    viewElems.weatherForecastView.style.display = "block";
  } else {
    viewElems.weatherSearchView.style.display = "flex";
    viewElems.weatherForecastView.style.display = "none";
  }
};

const returnToSearch = () => {
  fadeInOut();
  setTimeout(() => {
    switchView();
    fadeInOut();
  }, 500);
};

window.addEventListener("DOMContentLoaded", initializeApp);
