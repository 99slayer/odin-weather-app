//PULL, ORGANIZE, DISPLAY
import { pullWeatherData, parseWeatherData } from "./functions";
const btn = document.querySelector('#search-button');

btn.onclick = function(){
  // pullWeatherData('edmonton');
  parseWeatherData(pullWeatherData('calgary'));
};
