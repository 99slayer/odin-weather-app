/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateCurrentData": () => (/* binding */ updateCurrentData),
/* harmony export */   "updateWeatherCard": () => (/* binding */ updateWeatherCard)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");


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

searchInput.onchange = (e) => {search(searchInput.value)};
searchBtn.onclick = (e) => {search(searchInput.value)};

async function search(input){
  let weatherObj = await (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getData)(input);
  if(!weatherObj){
    //should have some kind of error displayed
    return;
  }
  updateWeatherCard(currentData);
}

function updateCurrentData(data){
  currentData = data;
};

function getTimeInfo(offset){
  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset()* 60000
  let utc = localTime + localOffset;
  let time = utc + (1000 * offset);
  let nd = new Date(time);
  let mins = nd.getMinutes();
  if(mins<10){
    mins = '0' + mins;
  };
  let myDate = nd.toDateString() + ' ' + nd.getHours() + ':' + mins;
  return myDate;
}

function updateWeatherCard(weatherData){
  console.log(getTimeInfo(weatherData.timezone));
  city.textContent = weatherData.city + ',';
  country.textContent = weatherData.country;
  date.textContent = getTimeInfo(weatherData.timezone);
  temp.textContent = parseFloat(weatherData.temp).toFixed() + '°';
  minMax.textContent = `${parseFloat(weatherData.tempMax).toFixed()}° | ${parseFloat(weatherData.tempMin).toFixed()}°`;
  description.textContent = weatherData.description.toUpperCase();
  feelsLike.textContent = 'FEELS LIKE: ' + parseFloat(weatherData.feelsLike).toFixed() + '°';
  humidity.textContent = 'HUMIDITY: '+ weatherData.humidity;
  icon.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
  wind.textContent = 'WIND SPEED: ' + weatherData.windSpeed + 'mps';
  console.log(currentData);
  //if checked unit=>imperial|unchecked <= celcius
}

function unitConversion(){
  if(!unitSliderInput.checked){
    //celcius => fahrenheit
    currentData.temp = ((currentData.temp * 9/5) + 32).toFixed();
    currentData.tempMin = ((currentData.tempMin * 9/5) + 32).toFixed();
    currentData.tempMax = ((currentData.tempMax * 9/5) + 32).toFixed();
    currentData.feelsLike = ((currentData.feelsLike * 9/5) + 32).toFixed();
    console.log({temp:currentData.temp,tempMin:currentData.tempMin,tempMax:currentData.tempMax,feelsLike:currentData.feelsLike});
  } else {
    //fahrenheit => celcius
    currentData.temp = ((currentData.temp - 32) * 5/9).toFixed();
    currentData.tempMin = ((currentData.tempMin - 32) * 5/9).toFixed();
    currentData.tempMax = ((currentData.tempMax - 32) * 5/9).toFixed();
    currentData.feelsLike = ((currentData.feelsLike - 32) * 5/9).toFixed();
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

function playLoadingAnimation(){

}

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


function pullWeatherData(city){
  const request = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e0cbdd54ee0f62527d707f21ce6d2e0d`,{mode:'cors'})
    .then(function(response){
      console.log(response);

      //runs if input is not a city
      if(response.status === 404){
        return ;
      }
      // return Promise.reject(response);
      return response.json();
    })
    
    // runs if request was rejected
    .catch(function(error){
      console.error(`ERROR:${error}`);
    });
  return request;
};

//if fetch fails hide weather card and display error message

function parseWeatherData(weatherObj){
  if(!weatherObj){
    return;
  }
  try {
    console.log(weatherObj);
    const weatherData = {};
    let data = weatherObj;
    console.log(data);
  
    weatherData.temp = data.main.temp;
    weatherData.tempMin = data.main.temp_min;
    weatherData.tempMax = data.main.temp_max;
    weatherData.feelsLike = data.main.feels_like;
    weatherData.humidity = data.main.humidity + '%';
    // weatherData.weather = data.weather;
    weatherData.description = data.weather[0].description;
    weatherData.icon = data.weather[0].icon;
    // data.weather is an array of the current weather conditions
    weatherData.windSpeed = data.wind.speed;
    weatherData.clouds = data.clouds.all + '%';
    weatherData.country = data.sys.country;
    weatherData.timezone = data.timezone;
    weatherData.city = data.name;
  
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    //can throw error if the data variable is undefined
    console.error(error);
  };
};

async function getData(input){
  const raw = await pullWeatherData(input);
  const data = parseWeatherData(raw);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.updateCurrentData)(data);
  return data;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
//PULL, ORGANIZE, DISPLAY



window.onload = async function(){
  let onloadData = await (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getData)('new york');
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.updateWeatherCard)(onloadData);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0IsNEJBQTRCOztBQUU1QjtBQUNBLHlCQUF5QixtREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBDQUEwQyxNQUFNLDBDQUEwQztBQUNwSDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsaUJBQWlCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhHQUE4RztBQUMvSCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4R0FBOEc7QUFDL0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ3hIMEM7O0FBRTFDO0FBQ0EsNkVBQTZFLEtBQUssdURBQXVELFlBQVk7QUFDcko7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE1BQU07QUFDbkMsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEVBQUUsdURBQWlCO0FBQ25CO0FBQ0E7Ozs7Ozs7VUM5REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNzQztBQUNJOztBQUUxQztBQUNBLHlCQUF5QixtREFBTztBQUNoQyxFQUFFLHVEQUFpQjtBQUNuQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxubGV0IGN1cnJlbnREYXRhO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0Jyk7XG5zZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1idXR0b24nKTtcblxuY29uc3Qgd2VhdGhlckNhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1jYXJkJyk7XG5jb25zdCBhcmVhSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmVhLWluZm8nKTtcbmNvbnN0IGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpO1xuY29uc3QgY291bnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudHJ5Jyk7XG5jb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUnKTtcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpO1xuY29uc3QgdW5pdFNsaWRlckNvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5pdC1zbGlkZXItY29udCcpO1xuY29uc3QgdW5pdFNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNsaWRlcicpO1xuY29uc3QgdW5pdFNsaWRlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXQtc2xpZGVyLWlucHV0Jyk7XG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJyk7XG4vLyBzbGlkZXIuY2hlY2tlZCA9IGZhbHNlO1xuY29uc3QgaWNvbkNvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1jb250Jyk7XG5jb25zdCBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24nKTtcbmNvbnN0IHRlbXBDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAtY29udCcpO1xuY29uc3QgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wJyk7XG5jb25zdCBtaW5NYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluLW1heCcpO1xuY29uc3Qgd2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1kZXRhaWxzJyk7XG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlbHMtbGlrZScpO1xuY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB3aW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlY2lwaXRhdGlvbicpO1xuXG5zZWFyY2hJbnB1dC5vbmNoYW5nZSA9IChlKSA9PiB7c2VhcmNoKHNlYXJjaElucHV0LnZhbHVlKX07XG5zZWFyY2hCdG4ub25jbGljayA9IChlKSA9PiB7c2VhcmNoKHNlYXJjaElucHV0LnZhbHVlKX07XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaChpbnB1dCl7XG4gIGxldCB3ZWF0aGVyT2JqID0gYXdhaXQgZ2V0RGF0YShpbnB1dCk7XG4gIGlmKCF3ZWF0aGVyT2JqKXtcbiAgICAvL3Nob3VsZCBoYXZlIHNvbWUga2luZCBvZiBlcnJvciBkaXNwbGF5ZWRcbiAgICByZXR1cm47XG4gIH1cbiAgdXBkYXRlV2VhdGhlckNhcmQoY3VycmVudERhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ3VycmVudERhdGEoZGF0YSl7XG4gIGN1cnJlbnREYXRhID0gZGF0YTtcbn07XG5cbmZ1bmN0aW9uIGdldFRpbWVJbmZvKG9mZnNldCl7XG4gIGxldCBkID0gbmV3IERhdGUoKTtcbiAgbGV0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpO1xuICBsZXQgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkqIDYwMDAwXG4gIGxldCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldDtcbiAgbGV0IHRpbWUgPSB1dGMgKyAoMTAwMCAqIG9mZnNldCk7XG4gIGxldCBuZCA9IG5ldyBEYXRlKHRpbWUpO1xuICBsZXQgbWlucyA9IG5kLmdldE1pbnV0ZXMoKTtcbiAgaWYobWluczwxMCl7XG4gICAgbWlucyA9ICcwJyArIG1pbnM7XG4gIH07XG4gIGxldCBteURhdGUgPSBuZC50b0RhdGVTdHJpbmcoKSArICcgJyArIG5kLmdldEhvdXJzKCkgKyAnOicgKyBtaW5zO1xuICByZXR1cm4gbXlEYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckNhcmQod2VhdGhlckRhdGEpe1xuICBjb25zb2xlLmxvZyhnZXRUaW1lSW5mbyh3ZWF0aGVyRGF0YS50aW1lem9uZSkpO1xuICBjaXR5LnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEuY2l0eSArICcsJztcbiAgY291bnRyeS50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmNvdW50cnk7XG4gIGRhdGUudGV4dENvbnRlbnQgPSBnZXRUaW1lSW5mbyh3ZWF0aGVyRGF0YS50aW1lem9uZSk7XG4gIHRlbXAudGV4dENvbnRlbnQgPSBwYXJzZUZsb2F0KHdlYXRoZXJEYXRhLnRlbXApLnRvRml4ZWQoKSArICfCsCc7XG4gIG1pbk1heC50ZXh0Q29udGVudCA9IGAke3BhcnNlRmxvYXQod2VhdGhlckRhdGEudGVtcE1heCkudG9GaXhlZCgpfcKwIHwgJHtwYXJzZUZsb2F0KHdlYXRoZXJEYXRhLnRlbXBNaW4pLnRvRml4ZWQoKX3CsGA7XG4gIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEuZGVzY3JpcHRpb24udG9VcHBlckNhc2UoKTtcbiAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gJ0ZFRUxTIExJS0U6ICcgKyBwYXJzZUZsb2F0KHdlYXRoZXJEYXRhLmZlZWxzTGlrZSkudG9GaXhlZCgpICsgJ8KwJztcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSAnSFVNSURJVFk6ICcrIHdlYXRoZXJEYXRhLmh1bWlkaXR5O1xuICBpY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3dlYXRoZXJEYXRhLmljb259QDJ4LnBuZ2A7XG4gIHdpbmQudGV4dENvbnRlbnQgPSAnV0lORCBTUEVFRDogJyArIHdlYXRoZXJEYXRhLndpbmRTcGVlZCArICdtcHMnO1xuICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gIC8vaWYgY2hlY2tlZCB1bml0PT5pbXBlcmlhbHx1bmNoZWNrZWQgPD0gY2VsY2l1c1xufVxuXG5mdW5jdGlvbiB1bml0Q29udmVyc2lvbigpe1xuICBpZighdW5pdFNsaWRlcklucHV0LmNoZWNrZWQpe1xuICAgIC8vY2VsY2l1cyA9PiBmYWhyZW5oZWl0XG4gICAgY3VycmVudERhdGEudGVtcCA9ICgoY3VycmVudERhdGEudGVtcCAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNaW4gPSAoKGN1cnJlbnREYXRhLnRlbXBNaW4gKiA5LzUpICsgMzIpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS50ZW1wTWF4ID0gKChjdXJyZW50RGF0YS50ZW1wTWF4ICogOS81KSArIDMyKS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEuZmVlbHNMaWtlID0gKChjdXJyZW50RGF0YS5mZWVsc0xpa2UgKiA5LzUpICsgMzIpLnRvRml4ZWQoKTtcbiAgICBjb25zb2xlLmxvZyh7dGVtcDpjdXJyZW50RGF0YS50ZW1wLHRlbXBNaW46Y3VycmVudERhdGEudGVtcE1pbix0ZW1wTWF4OmN1cnJlbnREYXRhLnRlbXBNYXgsZmVlbHNMaWtlOmN1cnJlbnREYXRhLmZlZWxzTGlrZX0pO1xuICB9IGVsc2Uge1xuICAgIC8vZmFocmVuaGVpdCA9PiBjZWxjaXVzXG4gICAgY3VycmVudERhdGEudGVtcCA9ICgoY3VycmVudERhdGEudGVtcCAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNaW4gPSAoKGN1cnJlbnREYXRhLnRlbXBNaW4gLSAzMikgKiA1LzkpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS50ZW1wTWF4ID0gKChjdXJyZW50RGF0YS50ZW1wTWF4IC0gMzIpICogNS85KS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEuZmVlbHNMaWtlID0gKChjdXJyZW50RGF0YS5mZWVsc0xpa2UgLSAzMikgKiA1LzkpLnRvRml4ZWQoKTtcbiAgICBjb25zb2xlLmxvZyh7dGVtcDpjdXJyZW50RGF0YS50ZW1wLHRlbXBNaW46Y3VycmVudERhdGEudGVtcE1pbix0ZW1wTWF4OmN1cnJlbnREYXRhLnRlbXBNYXgsZmVlbHNMaWtlOmN1cnJlbnREYXRhLmZlZWxzTGlrZX0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNsaWRlckZ1bmMoKXtcbiAgLy9jaGVja2VkXG4gIC8vIGNvbnNvbGUubG9nKHVuaXRTbGlkZXJJbnB1dC5jaGVja2VkKTtcbiAgaWYodW5pdFNsaWRlcklucHV0LmNoZWNrZWQpe1xuICAgIHVuaXRTbGlkZXJJbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgdW5pdFNsaWRlci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0JztcbiAgICBzbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2hlY2tlZCcpO1xuICAgIC8vY29udmVydCB1bml0c1xuICAvL3VuY2hlY2tlZFxuICB9IGVsc2Uge1xuICAgIHVuaXRTbGlkZXJJbnB1dC5jaGVja2VkID0gdHJ1ZTtcbiAgICB1bml0U2xpZGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtZW5kJztcbiAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnY2hlY2tlZCcpO1xuICAgIC8vY29udmVydCB1bml0c1xuICB9XG4gIHVuaXRDb252ZXJzaW9uKCk7XG4gIHVwZGF0ZVdlYXRoZXJDYXJkKGN1cnJlbnREYXRhKTtcbn1cblxudW5pdFNsaWRlci5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgc2xpZGVyRnVuYygpO1xufTtcblxuZnVuY3Rpb24gcGxheUxvYWRpbmdBbmltYXRpb24oKXtcblxufSIsImltcG9ydCB7IHVwZGF0ZUN1cnJlbnREYXRhIH0gZnJvbSBcIi4vRE9NXCI7XG5cbmZ1bmN0aW9uIHB1bGxXZWF0aGVyRGF0YShjaXR5KXtcbiAgY29uc3QgcmVxdWVzdCA9IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJkFQUElEPWUwY2JkZDU0ZWUwZjYyNTI3ZDcwN2YyMWNlNmQyZTBkYCx7bW9kZTonY29ycyd9KVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgLy9ydW5zIGlmIGlucHV0IGlzIG5vdCBhIGNpdHlcbiAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KXtcbiAgICAgICAgcmV0dXJuIDtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pXG4gICAgXG4gICAgLy8gcnVucyBpZiByZXF1ZXN0IHdhcyByZWplY3RlZFxuICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICBjb25zb2xlLmVycm9yKGBFUlJPUjoke2Vycm9yfWApO1xuICAgIH0pO1xuICByZXR1cm4gcmVxdWVzdDtcbn07XG5cbi8vaWYgZmV0Y2ggZmFpbHMgaGlkZSB3ZWF0aGVyIGNhcmQgYW5kIGRpc3BsYXkgZXJyb3IgbWVzc2FnZVxuXG5mdW5jdGlvbiBwYXJzZVdlYXRoZXJEYXRhKHdlYXRoZXJPYmope1xuICBpZighd2VhdGhlck9iail7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2cod2VhdGhlck9iaik7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSB7fTtcbiAgICBsZXQgZGF0YSA9IHdlYXRoZXJPYmo7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIFxuICAgIHdlYXRoZXJEYXRhLnRlbXAgPSBkYXRhLm1haW4udGVtcDtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWluID0gZGF0YS5tYWluLnRlbXBfbWluO1xuICAgIHdlYXRoZXJEYXRhLnRlbXBNYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgd2VhdGhlckRhdGEuZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgd2VhdGhlckRhdGEuaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHkgKyAnJSc7XG4gICAgLy8gd2VhdGhlckRhdGEud2VhdGhlciA9IGRhdGEud2VhdGhlcjtcbiAgICB3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICB3ZWF0aGVyRGF0YS5pY29uID0gZGF0YS53ZWF0aGVyWzBdLmljb247XG4gICAgLy8gZGF0YS53ZWF0aGVyIGlzIGFuIGFycmF5IG9mIHRoZSBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xuICAgIHdlYXRoZXJEYXRhLndpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICB3ZWF0aGVyRGF0YS5jbG91ZHMgPSBkYXRhLmNsb3Vkcy5hbGwgKyAnJSc7XG4gICAgd2VhdGhlckRhdGEuY291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XG4gICAgd2VhdGhlckRhdGEudGltZXpvbmUgPSBkYXRhLnRpbWV6b25lO1xuICAgIHdlYXRoZXJEYXRhLmNpdHkgPSBkYXRhLm5hbWU7XG4gIFxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy9jYW4gdGhyb3cgZXJyb3IgaWYgdGhlIGRhdGEgdmFyaWFibGUgaXMgdW5kZWZpbmVkXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShpbnB1dCl7XG4gIGNvbnN0IHJhdyA9IGF3YWl0IHB1bGxXZWF0aGVyRGF0YShpbnB1dCk7XG4gIGNvbnN0IGRhdGEgPSBwYXJzZVdlYXRoZXJEYXRhKHJhdyk7XG4gIHVwZGF0ZUN1cnJlbnREYXRhKGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vUFVMTCwgT1JHQU5JWkUsIERJU1BMQVlcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7IHVwZGF0ZVdlYXRoZXJDYXJkIH0gZnJvbSBcIi4vRE9NXCI7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpe1xuICBsZXQgb25sb2FkRGF0YSA9IGF3YWl0IGdldERhdGEoJ25ldyB5b3JrJyk7XG4gIHVwZGF0ZVdlYXRoZXJDYXJkKG9ubG9hZERhdGEpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==