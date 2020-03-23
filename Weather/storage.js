class Storage {
  constructor() {
    this.city;
    this.state;
    this.defaultCity = "Timisoara";
    this.defaultState = "RO";
  }

  getLocationData() {
    const storageCity = localStorage.getItem("city");
    if (storageCity === null) {
      this.city = this.defaultCity;
    } else {
      this.city = storageCity;
    }

    const storageState = localStorage.getItem("state");
    if (storageState === null) {
      this.state = this.defaultState;
    } else {
      this.state = storageState;
    }

    return {
      city: this.city,
      state: this.state
    };
  }

  setLocationData(city, state) {
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
  }
}
