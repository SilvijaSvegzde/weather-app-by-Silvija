function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
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

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${currentDay} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temp = document.querySelector("#temperature-value");
  let cityName = document.querySelector("#updated-city");
  let description = document.querySelector("#desc");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let highest = document.querySelector("#highest");
  let lowest = document.querySelector("#lowest");
  let country = document.querySelector("#updated-country");
  let dateElement = document.querySelector("#currentTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temp.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  highest.innerHTML = Math.round(response.data.main.temp_max);
  lowest.innerHTML = Math.round(response.data.main.temp_min);
  country.innerHTML = response.data.sys.country;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function retrievePosition(position) {
  let apiKey = "46fd4cb2825699c13e293644a9027f76";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search(cityInput.value);
