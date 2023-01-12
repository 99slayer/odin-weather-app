import { getData } from "./functions";

let currentData;
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

const weatherCard = document.getElementById('weather-card');
const areaInfo = document.getElementById('area-info');
const city = document.getElementById('city');
const country = document.getElementById('country');
const date = document.getElementById('date');
const time = document.getElementById('time');
const unitSliderCont = document.getElementById('unit-slider-cont');
const unitSlider = document.getElementById('unit-slider');
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
  let weatherObj = await getData(searchInput.value);
  if(!weatherObj){
    //display error message
    return;
  }
  updateWeatherCard(weatherObj);

  //finishedGettingData event**
  //make custom event for when data is finished being pulled
  // console.log(weatherObj);
  //fill out weather card function (weatherObj);
  // currentData = getData(searchInput.value);
  // console.log(currentData);
});

function updateWeatherCard(weatherData){
  console.log(weatherData);
}

export function test(){
  console.log('test');
}