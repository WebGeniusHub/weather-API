let weather = {
  apiKey: '56a7ce6ab3c1d3c509e06587b4bafe71',
  fetchWeather: function(city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === '404') {
          this.displayErrorMessage();
        } else {
          this.displayWeather(data);
        }
      });
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    document.querySelector('.city').innerHTML = name;
    document.querySelector('.country').innerHTML = country;
    document.querySelector('.temp').innerHTML = Math.floor(temp) + '°C';
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerHTML = description;
    document.querySelector('.humidity').innerHTML = 'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerHTML = speed + ' km/h';

    // Remove error message if it was previously displayed
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.classList.remove('show');
    }
  },
  displayErrorMessage: function() {
    // Remove existing error message if it was previously displayed
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }

    // Create a new error message element
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = 'The entered city does not exist. Please try again.';

    // Append the error message element to the document body
    document.querySelector('.card').appendChild(errorElement);

    // Show the error message
    errorElement.classList.add('show');
  },
  search: function() {
    const searchInput = document.querySelector('.search-bar');
    const city = searchInput.value.trim();

    if (city) {
      this.fetchWeather(city);
      searchInput.value = '';
    }
  },
};

document.querySelector('.btn').addEventListener('click', function() {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    weather.search();
  }
});
