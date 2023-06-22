let weather = {
    'apiKey': '56a7ce6ab3c1d3c509e06587b4bafe71',
    fetchWeather : function(city) {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='
        + city
        +'&units=metric&appid=' 
        + this.apiKey
      ).then((response) => response.json())
      .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data){
      const { name } = data;
      const { icon , description } = data.weather[0];
      const { temp, humidity } =data.main;
      const { speed } = data.wind;
      const { country } = data.sys;
  
      console.log(name, icon, description, temp, humidity, speed , country)
  
      document.querySelector('.city').innerHTML =  name;
      document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/'+ icon + '@4x.png';
      document.querySelector('.description').innerHTML = description;
      document.querySelector('.temp').innerHTML =  Math.floor(temp)  + '°C';
      document.querySelector('.humidity').innerHTML = 'Humidity ' + humidity + '%'
      document.querySelector('.wind').innerHTML = 'Wind speed ' + speed + 'km/h'
      document.querySelector('.country').innerHTML= country
      
    },
  
    search: function(){
     this.fetchWeather( document.querySelector('.search-bar').value);
    }
  }
  
  document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
  })

  console.log(weather)