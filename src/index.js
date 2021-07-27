let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

let current = document.querySelector("#currentTime");
current.innerHTML = `${currentDay} ${hours}:${minutes}`;

function showCurrentWeather(response) {
  let temp = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#updated-city");
  cityName.innerHTML = response.data.name;
  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  let country = document.querySelector("#update-country");
  country.innerHTML = response.data.sys.country;
}

function retrievePosition(position) {
  let apiKey = "46fd4cb2825699c13e293644a9027f76";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature-value");
  temp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#updated-city");
  cityName.innerHTML = response.data.name;
  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  let country = document.querySelector("#update-country");
  country.innerHTML = response.data.sys.country;
}

function showWeather(city) {
  let apiKey = "46fd4cb2825699c13e293644a9027f76";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let cityName = document.querySelector("#updated-city");
  cityName.innerHTML = `${cityInput.value}`;

  showWeather(cityInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);
