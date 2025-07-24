function showweather(response) {
  let temperature = document.querySelector("#weather-temp");
  let temp = response.data.temperature.current;
  temperature.innerHTML = Math.round(temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  getForecast(response.data.city); // ✅ fetch forecast here

  // Description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  // Humidity
  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  // Wind
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  // Weather Icon
  let iconImage = document.querySelector("#icon");
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  // Time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
  }
}

function cityweather(city) {
  let apiKey = "2faae9d4e47d0b0a09a9to05afdf381d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showweather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  cityweather(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Default city
cityweather("Addis Ababa");

function getForecast(city) {
  let apiKey = "2faae9d4e47d0b0a09a9to05afdf381d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = document.querySelector("#forcast");
  let forecastHTML = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  response.data.daily.slice(0, 6).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let dayName = days[date.getDay()];
    forecastHTML += `
      <div class="weather-forcast-day">
        <div class="weather-forcast-date">${dayName}</div>
        <div class="weather-forcast-icon">
          <img src="${day.condition.icon_url}" width="40"/>
        </div>
        <div class="weather-foracst-temp">🌡️ ${Math.round(day.temperature.maximum)}°</div>
        <div class="weather-for">🌙 ${Math.round(day.temperature.minimum)}°</div>
      </div>
    `;
  });

  forecast.innerHTML = forecastHTML;
}

   



