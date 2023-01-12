//PULL, ORGANIZE, DISPLAY
import { getData } from "./functions";
const btn = document.querySelector('#search-button');

btn.onclick = function(){
  // pullWeatherData('edmonton');
  getData('calgary');
};
