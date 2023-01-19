import { getData } from "./functions";

let currentData;
const searchInput = document.getElementById('search-input');
searchInput.value = '';
const searchBtn = document.getElementById('search-button');

const weatherCard = document.getElementById('weather-card');
const areaInfo = document.getElementById('area-info');
const city = document.getElementById('city');
const country = document.getElementById('country');
const date = document.getElementById('date');
const time = document.getElementById('time');
const unitSliderCont = document.getElementById('unit-slider-cont');
const unitSlider = document.getElementById('unit-slider');
const unitSliderInput = document.getElementById('unit-slider-input');
const slider = document.getElementById('slider');
// slider.checked = false;
const iconCont = document.getElementById('icon-cont');
const icon = document.getElementById('icon');
const tempCont = document.getElementById('temp-cont');
const temp = document.getElementById('temp');
const minMax = document.getElementById('min-max');
const weatherDetails = document.getElementById('weather-details');
const feelsLike = document.getElementById('feels-like');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const precipitation = document.getElementById('precipitation');

searchInput.addEventListener('change', async (e)=>{
  //gets us weather data

  //THIS SHOULD BE ITS OWN FUNCTION**
  let weatherObj = await getData(searchInput.value);
  if(!weatherObj){
    //display error message
    return;
  }
  // currentData = weatherObj;
  updateWeatherCard(currentData);
});

export function updateWeatherCard(weatherData){
  city.textContent = weatherData.city + ',';
  country.textContent = weatherData.country;
  // date.textContent = Date.now();
  temp.textContent = parseFloat(weatherData.temp).toFixed(1) + '°';
  minMax.textContent = `${parseFloat(weatherData.tempMax).toFixed(1)}° | ${parseFloat(weatherData.tempMin).toFixed(1)}°`;
  description.textContent = weatherData.description.toUpperCase();
  feelsLike.textContent = 'FEELS LIKE: ' + parseFloat(weatherData.feelsLike).toFixed(1) + '°';
  humidity.textContent = 'HUMIDITY: '+ weatherData.humidity;
  icon.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
  wind.textContent = 'WIND SPEED: ' + weatherData.windSpeed + 'mps';
  console.log(currentData);
  //if checked unit=>imperial|unchecked <= celcius
}

function unitConversion(){
  if(!unitSliderInput.checked){
    //celcius => fahrenheit
    currentData.temp = ((currentData.temp * 9/5) + 32).toFixed(1);
    currentData.tempMin = ((currentData.tempMin * 9/5) + 32).toFixed(1);
    currentData.tempMax = ((currentData.tempMax * 9/5) + 32).toFixed(1);
    currentData.feelsLike = ((currentData.feelsLike * 9/5) + 32).toFixed(1);
    console.log({temp:currentData.temp,tempMin:currentData.tempMin,tempMax:currentData.tempMax,feelsLike:currentData.feelsLike});
  } else {
    //fahrenheit => celcius
    currentData.temp = ((currentData.temp - 32) * 5/9).toFixed(1);
    currentData.tempMin = ((currentData.tempMin - 32) * 5/9).toFixed(1);
    currentData.tempMax = ((currentData.tempMax - 32) * 5/9).toFixed(1);
    currentData.feelsLike = ((currentData.feelsLike - 32) * 5/9).toFixed(1);
    console.log({temp:currentData.temp,tempMin:currentData.tempMin,tempMax:currentData.tempMax,feelsLike:currentData.feelsLike});
  }
}

function sliderFunc(){
  //checked
  // console.log(unitSliderInput.checked);
  if(unitSliderInput.checked){
    unitSliderInput.checked = false;
    unitSlider.style.justifyContent = 'flex-start';
    slider.classList.remove('checked');
    //convert units
  //unchecked
  } else {
    unitSliderInput.checked = true;
    unitSlider.style.justifyContent = 'flex-end';
    slider.classList.add('checked');
    //convert units
  }
  unitConversion();
  updateWeatherCard(currentData);
}

unitSlider.onclick = function(){
  sliderFunc();
};

export function test(){
  console.log('test');
}

export function updateCurrentData(data){
  currentData = data;
};