//date function

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursaday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hour = now.getHours();

let minutes = now.getMinutes();

function showDay() {
  let dayHour = document.querySelector("#day-hour");
  dayHour.innerHTML = `${day}, ${hour}:${minutes} `;
}

showDay();

//search function

function display(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function getCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;

  axios.get(apiUrl).then(display);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = cityInput.value;
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", getCurrentCity);

//fake temperature

function defaultTemp(response) {
  let temperature = document.querySelector("#temperature");
  console.log(response.data.main.temp);
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function getDefaultTemperature() {
  let apiUrlDefault = `https://api.openweathermap.org/data/2.5/weather?q=Porto&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;

  axios.get(apiUrlDefault).then(defaultTemp);
}

getDefaultTemperature();

//current location

function currentTemp(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;

  axios.get(apiUrl).then(currentTemp);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let btCurrent = document.querySelector("#current-location");
btCurrent.addEventListener("click", getCurrentLocation);
