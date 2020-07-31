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
};

const initializeApp = () => {
  connectDOMElems();
  setupListeners();
};

const onEnterSubmit = (e) => {
  if (e.key === "Enter") {
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then((data) => {
      printWeather();
    });
  }
};
const onClickSubmit = () => {
  console.log("onClickSubmit ok");
};

window.addEventListener("DOMContentLoaded", initializeApp);
