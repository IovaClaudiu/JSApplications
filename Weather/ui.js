class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.icon = document.getElementById("w-icon");
    this.details = document.getElementById("w-details");
    this.humidity = document.getElementById("w-humidity");
    this.feelsLike = document.getElementById("w-feels-like");
    this.dewpoint = document.getElementById("w-dewpoint");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    console.log(weather);
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent =
      Math.round(weather.main.temp - 273.15) + " Celsius";
    this.icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity}`;
    this.dewpoint.textContent = `Min temperature: ${weather.main.temp_min}`;
    this.feelsLike.textContent = `Feels like: ${weather.main.feels_like}`;
    this.wind.textContent = `Wind: ${weather.wind.speed}`;
  }
}
