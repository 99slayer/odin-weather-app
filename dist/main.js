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
/* harmony export */   "displayErrorMsg": () => (/* binding */ displayErrorMsg),
/* harmony export */   "updateCurrentData": () => (/* binding */ updateCurrentData),
/* harmony export */   "updateWeatherCard": () => (/* binding */ updateWeatherCard)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");


let currentData;
const searchInput = document.getElementById('search-input');
searchInput.value = '';
const searchBtn = document.getElementById('search-button');

const error = document.getElementById('error');
const errorMsg = document.getElementById('error-msg');

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
  error.style.display = 'none';
  weatherCard.style.display = 'grid';
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

function displayErrorMsg(message){
  weatherCard.style.display = 'none';
  error.style.display = 'flex';
  errorMsg.textContent = message;
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
        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayErrorMsg)('Error! Please make sure your input is valid.')
        return ;
      }
      // return Promise.reject(response);
      return response.json();
    })
    
    // runs if request was rejected
    .catch(function(error){
      console.error(`ERROR:${error}`);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayErrorMsg)('Error! request was rejected!');
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
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayErrorMsg)(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0IsNEJBQTRCOztBQUU1QjtBQUNBLHlCQUF5QixtREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQ0FBMEMsTUFBTSwwQ0FBMEM7QUFDcEg7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGlCQUFpQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4R0FBOEc7QUFDL0gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOEdBQThHO0FBQy9IO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQy9IMkQ7O0FBRTNEO0FBQ0EsNkVBQTZFLEtBQUssdURBQXVELFlBQVk7QUFDcko7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxxREFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQyxNQUFNLHFEQUFlO0FBQ3JCLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUkscURBQWU7QUFDbkI7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEVBQUUsdURBQWlCO0FBQ25CO0FBQ0E7Ozs7Ozs7VUNqRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNzQztBQUNJOztBQUUxQztBQUNBLHlCQUF5QixtREFBTztBQUNoQyxFQUFFLHVEQUFpQjtBQUNuQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxubGV0IGN1cnJlbnREYXRhO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0Jyk7XG5zZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1idXR0b24nKTtcblxuY29uc3QgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3InKTtcbmNvbnN0IGVycm9yTXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yLW1zZycpO1xuXG5jb25zdCB3ZWF0aGVyQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWNhcmQnKTtcbmNvbnN0IGFyZWFJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEtaW5mbycpO1xuY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5Jyk7XG5jb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnknKTtcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZScpO1xuY29uc3QgdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XG5jb25zdCB1bml0U2xpZGVyQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNsaWRlci1jb250Jyk7XG5jb25zdCB1bml0U2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXQtc2xpZGVyJyk7XG5jb25zdCB1bml0U2xpZGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5pdC1zbGlkZXItaW5wdXQnKTtcbmNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcbi8vIHNsaWRlci5jaGVja2VkID0gZmFsc2U7XG5jb25zdCBpY29uQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWNvbnQnKTtcbmNvbnN0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbicpO1xuY29uc3QgdGVtcENvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcC1jb250Jyk7XG5jb25zdCB0ZW1wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAnKTtcbmNvbnN0IG1pbk1heCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW4tbWF4Jyk7XG5jb25zdCB3ZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWRldGFpbHMnKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVscy1saWtlJyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVjaXBpdGF0aW9uJyk7XG5cbnNlYXJjaElucHV0Lm9uY2hhbmdlID0gKGUpID0+IHtzZWFyY2goc2VhcmNoSW5wdXQudmFsdWUpfTtcbnNlYXJjaEJ0bi5vbmNsaWNrID0gKGUpID0+IHtzZWFyY2goc2VhcmNoSW5wdXQudmFsdWUpfTtcblxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoKGlucHV0KXtcbiAgbGV0IHdlYXRoZXJPYmogPSBhd2FpdCBnZXREYXRhKGlucHV0KTtcbiAgaWYoIXdlYXRoZXJPYmope1xuICAgIC8vc2hvdWxkIGhhdmUgc29tZSBraW5kIG9mIGVycm9yIGRpc3BsYXllZFxuICAgIHJldHVybjtcbiAgfVxuICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB3ZWF0aGVyQ2FyZC5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICB1cGRhdGVXZWF0aGVyQ2FyZChjdXJyZW50RGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDdXJyZW50RGF0YShkYXRhKXtcbiAgY3VycmVudERhdGEgPSBkYXRhO1xufTtcblxuZnVuY3Rpb24gZ2V0VGltZUluZm8ob2Zmc2V0KXtcbiAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICBsZXQgbG9jYWxUaW1lID0gZC5nZXRUaW1lKCk7XG4gIGxldCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSogNjAwMDBcbiAgbGV0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0O1xuICBsZXQgdGltZSA9IHV0YyArICgxMDAwICogb2Zmc2V0KTtcbiAgbGV0IG5kID0gbmV3IERhdGUodGltZSk7XG4gIGxldCBtaW5zID0gbmQuZ2V0TWludXRlcygpO1xuICBpZihtaW5zPDEwKXtcbiAgICBtaW5zID0gJzAnICsgbWlucztcbiAgfTtcbiAgbGV0IG15RGF0ZSA9IG5kLnRvRGF0ZVN0cmluZygpICsgJyAnICsgbmQuZ2V0SG91cnMoKSArICc6JyArIG1pbnM7XG4gIHJldHVybiBteURhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVXZWF0aGVyQ2FyZCh3ZWF0aGVyRGF0YSl7XG4gIGNvbnNvbGUubG9nKGdldFRpbWVJbmZvKHdlYXRoZXJEYXRhLnRpbWV6b25lKSk7XG4gIGNpdHkudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5jaXR5ICsgJywnO1xuICBjb3VudHJ5LnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEuY291bnRyeTtcbiAgZGF0ZS50ZXh0Q29udGVudCA9IGdldFRpbWVJbmZvKHdlYXRoZXJEYXRhLnRpbWV6b25lKTtcbiAgdGVtcC50ZXh0Q29udGVudCA9IHBhcnNlRmxvYXQod2VhdGhlckRhdGEudGVtcCkudG9GaXhlZCgpICsgJ8KwJztcbiAgbWluTWF4LnRleHRDb250ZW50ID0gYCR7cGFyc2VGbG9hdCh3ZWF0aGVyRGF0YS50ZW1wTWF4KS50b0ZpeGVkKCl9wrAgfCAke3BhcnNlRmxvYXQod2VhdGhlckRhdGEudGVtcE1pbikudG9GaXhlZCgpfcKwYDtcbiAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbi50b1VwcGVyQ2FzZSgpO1xuICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSAnRkVFTFMgTElLRTogJyArIHBhcnNlRmxvYXQod2VhdGhlckRhdGEuZmVlbHNMaWtlKS50b0ZpeGVkKCkgKyAnwrAnO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9ICdIVU1JRElUWTogJysgd2VhdGhlckRhdGEuaHVtaWRpdHk7XG4gIGljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7d2VhdGhlckRhdGEuaWNvbn1AMngucG5nYDtcbiAgd2luZC50ZXh0Q29udGVudCA9ICdXSU5EIFNQRUVEOiAnICsgd2VhdGhlckRhdGEud2luZFNwZWVkICsgJ21wcyc7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnREYXRhKTtcbiAgLy9pZiBjaGVja2VkIHVuaXQ9PmltcGVyaWFsfHVuY2hlY2tlZCA8PSBjZWxjaXVzXG59XG5cbmZ1bmN0aW9uIHVuaXRDb252ZXJzaW9uKCl7XG4gIGlmKCF1bml0U2xpZGVySW5wdXQuY2hlY2tlZCl7XG4gICAgLy9jZWxjaXVzID0+IGZhaHJlbmhlaXRcbiAgICBjdXJyZW50RGF0YS50ZW1wID0gKChjdXJyZW50RGF0YS50ZW1wICogOS81KSArIDMyKS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1pbiA9ICgoY3VycmVudERhdGEudGVtcE1pbiAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNYXggPSAoKGN1cnJlbnREYXRhLnRlbXBNYXggKiA5LzUpICsgMzIpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS5mZWVsc0xpa2UgPSAoKGN1cnJlbnREYXRhLmZlZWxzTGlrZSAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGNvbnNvbGUubG9nKHt0ZW1wOmN1cnJlbnREYXRhLnRlbXAsdGVtcE1pbjpjdXJyZW50RGF0YS50ZW1wTWluLHRlbXBNYXg6Y3VycmVudERhdGEudGVtcE1heCxmZWVsc0xpa2U6Y3VycmVudERhdGEuZmVlbHNMaWtlfSk7XG4gIH0gZWxzZSB7XG4gICAgLy9mYWhyZW5oZWl0ID0+IGNlbGNpdXNcbiAgICBjdXJyZW50RGF0YS50ZW1wID0gKChjdXJyZW50RGF0YS50ZW1wIC0gMzIpICogNS85KS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1pbiA9ICgoY3VycmVudERhdGEudGVtcE1pbiAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNYXggPSAoKGN1cnJlbnREYXRhLnRlbXBNYXggLSAzMikgKiA1LzkpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS5mZWVsc0xpa2UgPSAoKGN1cnJlbnREYXRhLmZlZWxzTGlrZSAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGNvbnNvbGUubG9nKHt0ZW1wOmN1cnJlbnREYXRhLnRlbXAsdGVtcE1pbjpjdXJyZW50RGF0YS50ZW1wTWluLHRlbXBNYXg6Y3VycmVudERhdGEudGVtcE1heCxmZWVsc0xpa2U6Y3VycmVudERhdGEuZmVlbHNMaWtlfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2xpZGVyRnVuYygpe1xuICAvL2NoZWNrZWRcbiAgLy8gY29uc29sZS5sb2codW5pdFNsaWRlcklucHV0LmNoZWNrZWQpO1xuICBpZih1bml0U2xpZGVySW5wdXQuY2hlY2tlZCl7XG4gICAgdW5pdFNsaWRlcklucHV0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB1bml0U2xpZGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnO1xuICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdjaGVja2VkJyk7XG4gICAgLy9jb252ZXJ0IHVuaXRzXG4gIC8vdW5jaGVja2VkXG4gIH0gZWxzZSB7XG4gICAgdW5pdFNsaWRlcklucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgIHVuaXRTbGlkZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnZmxleC1lbmQnO1xuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdjaGVja2VkJyk7XG4gICAgLy9jb252ZXJ0IHVuaXRzXG4gIH1cbiAgdW5pdENvbnZlcnNpb24oKTtcbiAgdXBkYXRlV2VhdGhlckNhcmQoY3VycmVudERhdGEpO1xufVxuXG51bml0U2xpZGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICBzbGlkZXJGdW5jKCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUVycm9yTXNnKG1lc3NhZ2Upe1xuICB3ZWF0aGVyQ2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBlcnJvck1zZy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG59IiwiaW1wb3J0IHsgZGlzcGxheUVycm9yTXNnLCB1cGRhdGVDdXJyZW50RGF0YSB9IGZyb20gXCIuL0RPTVwiO1xuXG5mdW5jdGlvbiBwdWxsV2VhdGhlckRhdGEoY2l0eSl7XG4gIGNvbnN0IHJlcXVlc3QgPSBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZBUFBJRD1lMGNiZGQ1NGVlMGY2MjUyN2Q3MDdmMjFjZTZkMmUwZGAse21vZGU6J2NvcnMnfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIC8vcnVucyBpZiBpbnB1dCBpcyBub3QgYSBjaXR5XG4gICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgIGRpc3BsYXlFcnJvck1zZygnRXJyb3IhIFBsZWFzZSBtYWtlIHN1cmUgeW91ciBpbnB1dCBpcyB2YWxpZC4nKVxuICAgICAgICByZXR1cm4gO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICBcbiAgICAvLyBydW5zIGlmIHJlcXVlc3Qgd2FzIHJlamVjdGVkXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVSUk9SOiR7ZXJyb3J9YCk7XG4gICAgICBkaXNwbGF5RXJyb3JNc2coJ0Vycm9yISByZXF1ZXN0IHdhcyByZWplY3RlZCEnKTtcbiAgICB9KTtcbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG4vL2lmIGZldGNoIGZhaWxzIGhpZGUgd2VhdGhlciBjYXJkIGFuZCBkaXNwbGF5IGVycm9yIG1lc3NhZ2VcblxuZnVuY3Rpb24gcGFyc2VXZWF0aGVyRGF0YSh3ZWF0aGVyT2JqKXtcbiAgaWYoIXdlYXRoZXJPYmope1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0ge307XG4gICAgbGV0IGRhdGEgPSB3ZWF0aGVyT2JqO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICBcbiAgICB3ZWF0aGVyRGF0YS50ZW1wID0gZGF0YS5tYWluLnRlbXA7XG4gICAgd2VhdGhlckRhdGEudGVtcE1pbiA9IGRhdGEubWFpbi50ZW1wX21pbjtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIHdlYXRoZXJEYXRhLmZlZWxzTGlrZSA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIHdlYXRoZXJEYXRhLmh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5ICsgJyUnO1xuICAgIC8vIHdlYXRoZXJEYXRhLndlYXRoZXIgPSBkYXRhLndlYXRoZXI7XG4gICAgd2VhdGhlckRhdGEuZGVzY3JpcHRpb24gPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgd2VhdGhlckRhdGEuaWNvbiA9IGRhdGEud2VhdGhlclswXS5pY29uO1xuICAgIC8vIGRhdGEud2VhdGhlciBpcyBhbiBhcnJheSBvZiB0aGUgY3VycmVudCB3ZWF0aGVyIGNvbmRpdGlvbnNcbiAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgd2VhdGhlckRhdGEuY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsICsgJyUnO1xuICAgIHdlYXRoZXJEYXRhLmNvdW50cnkgPSBkYXRhLnN5cy5jb3VudHJ5O1xuICAgIHdlYXRoZXJEYXRhLnRpbWV6b25lID0gZGF0YS50aW1lem9uZTtcbiAgICB3ZWF0aGVyRGF0YS5jaXR5ID0gZGF0YS5uYW1lO1xuICBcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vY2FuIHRocm93IGVycm9yIGlmIHRoZSBkYXRhIHZhcmlhYmxlIGlzIHVuZGVmaW5lZFxuICAgIGRpc3BsYXlFcnJvck1zZyhlcnJvcik7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShpbnB1dCl7XG4gIGNvbnN0IHJhdyA9IGF3YWl0IHB1bGxXZWF0aGVyRGF0YShpbnB1dCk7XG4gIGNvbnN0IGRhdGEgPSBwYXJzZVdlYXRoZXJEYXRhKHJhdyk7XG4gIHVwZGF0ZUN1cnJlbnREYXRhKGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vUFVMTCwgT1JHQU5JWkUsIERJU1BMQVlcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7IHVwZGF0ZVdlYXRoZXJDYXJkIH0gZnJvbSBcIi4vRE9NXCI7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpe1xuICBsZXQgb25sb2FkRGF0YSA9IGF3YWl0IGdldERhdGEoJ25ldyB5b3JrJyk7XG4gIHVwZGF0ZVdlYXRoZXJDYXJkKG9ubG9hZERhdGEpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==