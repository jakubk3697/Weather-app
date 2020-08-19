export const getWeatherByCity = (city) => {
  const api = `https://www.metaweather.com/api/location/search/?query=${city}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const woeid = data[0].woeid;
      const api2 = `https://www.metaweather.com/api/location/${woeid}`;
      return fetch(api2)
        .then((res) => res.json())
        .then((data) => data);
        
    });
};
