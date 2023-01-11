export function pullWeatherData(city){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e0cbdd54ee0f62527d707f21ce6d2e0d`,{mode:'cors'})
    .then((response)=>{
      return response.json();
    })
    // .then((response)=>{
    //   console.log(response)
    // })
    .catch((error)=>{
      console.error(error);
    });
};

//weatherPromise should be a promise
export function parseWeatherData(weatherPromise){
  const weatherData = {};
  weatherPromise.then((data)=>{
    console.log(data);
    weatherData.temp = data.main.temp;
    weatherData.tempMin = data.main.temp_min;
    weatherData.tempMax = data.main.temp_max;
    weatherData.feelsLike = data.main.feels_like;
    weatherData.humidity = data.main.humidity;
    // weatherData.weather = data.weather.main;
    // weatherData.description = data.weather.description;
    // weatherData.icon = data.weather.icon;
    // weather is an array of all current weather conditions in a city
    weatherData.windSpeed = data.wind.speed;
    weatherData.windDeg = data.wind.deg;
    weatherData.clouds = data.clouds.all;
    weatherData.visibility = data.visibility;
    weatherData.country = data.sys.country;
    weatherData.timezone = data.timezone;
    weatherData.city = data.name;
    
    console.log(weatherData);
  })
  .catch((error)=>{
    console.error(error);
  });
  return weatherData;
};

//also can display 5day forecast