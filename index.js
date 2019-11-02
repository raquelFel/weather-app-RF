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

//format hours

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//search function

function display(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let iconElement = document.querySelector("#main-icon");
  let icon = response.data.weather[0].icon;

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusTemp = response.data.main.temp;
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemp);
  switch (icon) {
    case "01d":
    case "01n":
      iconElement.setAttribute("src", `img/sun.png`);
      break;
    case "02d":
    case "02n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "03d":
    case "03n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "04d":
    case "04n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "09d":
    case "09n":
      iconElement.setAttribute("src", `img/shower.png`);
      break;
    case "10d":
    case "10n":
      iconElement.setAttribute("src", `img/rain.png`);
      break;
    case "11d":
    case "11n":
      iconElement.setAttribute("src", `img/rain2.png`);
      break;
  }
}

//forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  let icon = null;

  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    icon = forecast.weather[0].icon;

    forecastElement.innerHTML += `<div class="col-2" style="display: inline-block">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="85px" class="forecastIcons" id="icon-forecast">
                <div class="forecast-temp">
                    <strong>${Math.round(
                      forecast.main.temp_max
                    )}º</strong> ${Math.round(forecast.main.temp_min)}º
                </div>
            </div>
  `;
  }
}

function getCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;

  axios.get(apiUrl).then(display);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = cityInput.value;
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", getCurrentCity);

//default temperature

function defaultTemp(response) {
  let temperature = document.querySelector("#temperature");
  let iconElement = document.querySelector("#main-icon");
  let icon = response.data.weather[0].icon;

  celsiusTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(response.data.main.temp);
  switch (icon) {
    case "01d":
    case "01n":
      iconElement.setAttribute("src", `img/sun.png`);
      break;
    case "02d":
    case "02n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "03d":
    case "03n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "04d":
    case "04n":
      iconElement.setAttribute("src", `img/cloudy.png`);
      break;
    case "09d":
    case "09n":
      iconElement.setAttribute("src", `img/shower.png`);
      break;
    case "10d":
    case "10n":
      iconElement.setAttribute("src", `img/rain.png`);
      break;
    case "11d":
    case "11n":
      iconElement.setAttribute("src", `img/rain2.png`);
      break;
  }
}

function getDefaultTemperature() {
  let apiUrlDefault = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;

  axios.get(apiUrlDefault).then(defaultTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&APPID=f58b0854457e2f05df673d838cf4e8ca`;
  axios.get(apiUrl).then(defaultForecast);
}

getDefaultTemperature();

//default forecast

function defaultForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;

  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2" style="display: inline-block">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" alt="" width="85px" class="forecastIcons" id="icon-forecast">
                <div class="forecast-temp">
                    <strong>${Math.round(
                      forecast.main.temp_max
                    )}º</strong> ${Math.round(forecast.main.temp_min)}º
                </div>
            </div>
  `;
  }
}

//current location

function currentTemp(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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

//convert to fahrenheit and back to celsius

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheiht-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemp = null;
