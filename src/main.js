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

const onEnterSubmit = () => {};
const onClickSubmit = () => {};

window.addEventListener("DOMContentLoaded", initializeApp);
