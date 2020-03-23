class Weather {
  constructor(city, state) {
    this.host = "community-open-weather-map.p.rapidapi.com";
    this.key = "ca669e4150msh8fa4a254981f75cp1610e5jsnf8ff76564f27";
    this.city = city;
    this.state = state;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${this.city},${this.state}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": `${this.host}`,
          "x-rapidapi-key": `${this.key}`
        }
      }
    );

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
