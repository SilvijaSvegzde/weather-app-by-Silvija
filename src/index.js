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

  temp.innerHTML = Math.round(response.data.main.temp);
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

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "46fd4cb2825699c13e293644a9027f76";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

// Background color depending on time of the day

function changeBackground() {
  let hour = time("#currentTime");
  if (10 > hour < 18) {
    document.style.body.background =
      "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)";
  } else {
    document.style.body.background = "black";
  }
}

/// Background color function end
