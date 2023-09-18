function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${currentDay}, ${hours}:${minutes} 
  <br/> ${currentMonth} ${currentDate}, ${currentYear}
  <br/>`;
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
  let forecastElement = document.querySelector("#weather-forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `     
    <div class="col">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <br />
         <img
         src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }.png"
         alt=""
         width="85"
          />
        <br />
        <div class="forecast-temps">
         <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span> |
         <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherCondition(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#today-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelslikeElement = document.querySelector("#feels-like");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", submit);

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

searchCity("Las Vegas");
