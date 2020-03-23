const ui = new UI();

const storage = new Storage();
// Get stored locationData
const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);

// Load getWeather on DOM load
document.addEventListener("DOMContentLoaded", getWeather());

// Change location event
document.getElementById("w-change-btn").addEventListener("click", e => {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  weather.changeLocation(city, state);
  getWeather();

  // Save data
  storage.setLocationData(city, state);

  // Close modal Jquery
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      console.log(results);
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
