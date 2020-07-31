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
      // printWeather();
      switchView();
      fadeInOut();
    });
  }
};
const onClickSubmit = () => {
  fadeInOut();
  let query = viewElems.searchInput.value;
  getWeatherByCity(query).then((data) => {
    // printWeather();
    switchView();
    fadeInOut();
  });
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
    viewElems.weatherForecastView.style.display = "flex";
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
