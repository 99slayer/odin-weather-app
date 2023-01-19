//PULL, ORGANIZE, DISPLAY
import { getData } from "./functions";
import { updateWeatherCard } from "./DOM";

window.onload = async function(){
  let onloadData = await getData('new york');
  updateWeatherCard(onloadData);
};
