function formatDate(date) {
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
  let hour = date.getHours();
  let minute = date.getMinutes();

  return `${currentDay}, ${hour}:${minute} 
  <br/> ${currentMonth} ${currentDate}, ${currentYear}
  <br/>`;
}
function weatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
// function locationSearch(position) {
//let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitutde}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

//axios.get(apiUrl).then(weatherCondition);
//}

let dateTime = document.querySelector("#date-time");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-bar");
form.addEventListener("submit", submit);

// navigator.geolocation.getCurrentPosition(locationSearch);

searchCity("Las Vegas");
