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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row scrolling-wrapper flex-row flex-nowrap mt-1 pb-2 pt-1">`;

  forecast.forEach(function (forecastDay) {
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);
    let forecastIcon = forecastDay.weather[0].icon;
    forecastHTML =
      forecastHTML +
      `

<div class="col-sm-2 card card-block ">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <div><img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="" width="42" /></div>
                <div class="weather-forecast-temperatures"> <strong>${maxTemp}°</strong> ${minTemp}°</div>
            </div>
                
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "46fd4cb2825699c13e293644a9027f76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

search(cityInput.value);
