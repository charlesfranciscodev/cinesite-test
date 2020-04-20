import axios from "axios";

export async function geopositionSearch(lat, lon) {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${lat},${lon}`;
  let response = await axios.get(url);
  return response.data;
}

export async function cityNeighbors(locationKey) {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/neighbors/${locationKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`;
  let response = await axios.get(url);
  return response.data;
}

export async function currentConditions(locationKey) {
  let url = `http://dataservice.accuweather.com/currentconditions/v1//${locationKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`;
  let response = await axios.get(url);
  return response.data;
}

/**
 * Returns current conditions data for cities around a specific location.
 * @param {Number} lat latitude
 * @param {Number} lon longitude
 */
export async function currentConditionsForNeighbors(lat, lon) {
  let location = await geopositionSearch(lat, lon);
  let neighbors = await cityNeighbors(location["Key"]);
  let conditionsArray = [];
  for (let index = 0; index < neighbors.length; index++) {
    let conditions = await currentConditions(neighbors[index]["Key"]);
    conditions[0]["LocalizedName"] = neighbors[index]["LocalizedName"];
    conditions[0]["Key"] = neighbors[index]["Key"];
    conditionsArray.push(conditions[0]);
  }
  return conditionsArray;
}

export async function currentConditionsForTopCities() {
  let url = `http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`;
  let response = await axios.get(url);
  return response.data;
}

export async function autocompleteSearchByLocation(searchQuery) {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchQuery}`;
  let response = await axios.get(url);
  return response.data;
}

export async function dailyForecasts(locationKey) {
  let url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`;
  let response = await axios.get(url);
  return response.data["DailyForecasts"];
}
