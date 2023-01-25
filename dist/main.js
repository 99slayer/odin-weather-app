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

const loading = document.getElementById('loading');
const loadingMsg = document.getElementById('loading-msg');

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
  if(!weatherData){
    return;
  };
  error.style.display = 'none';
  // loading.style.display = 'none';
  weatherCard.style.display = 'grid';
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
// export function displayLoadingMsg(){
//   weatherCard.style.display = 'none';
//   loading.style.display = 'flex';
//   loadingMsg.textContent = '...';
// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQjtBQUMvQiw0QkFBNEI7O0FBRTVCO0FBQ0EseUJBQXlCLG1EQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBDQUEwQyxNQUFNLDBDQUEwQztBQUNwSDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsaUJBQWlCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhHQUE4RztBQUMvSCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4R0FBOEc7QUFDL0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFJOEU7O0FBRTlFO0FBQ0EsNkVBQTZFLEtBQUssdURBQXVELFlBQVk7QUFDcko7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixNQUFNO0FBQ25DLE1BQU0scURBQWU7QUFDckIsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSSxxREFBZTtBQUNuQjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsRUFBRSx1REFBaUI7QUFDbkI7QUFDQTs7Ozs7OztVQ2hFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3NDO0FBQ0k7O0FBRTFDO0FBQ0EseUJBQXlCLG1EQUFPO0FBQ2hDLEVBQUUsdURBQWlCO0FBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuXG5sZXQgY3VycmVudERhdGE7XG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtaW5wdXQnKTtcbnNlYXJjaElucHV0LnZhbHVlID0gJyc7XG5jb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJ1dHRvbicpO1xuXG5jb25zdCBlcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcicpO1xuY29uc3QgZXJyb3JNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3ItbXNnJyk7XG5cbmNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZycpO1xuY29uc3QgbG9hZGluZ01zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nLW1zZycpO1xuXG5jb25zdCB3ZWF0aGVyQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWNhcmQnKTtcbmNvbnN0IGFyZWFJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEtaW5mbycpO1xuY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5Jyk7XG5jb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnknKTtcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZScpO1xuY29uc3QgdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XG5jb25zdCB1bml0U2xpZGVyQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNsaWRlci1jb250Jyk7XG5jb25zdCB1bml0U2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXQtc2xpZGVyJyk7XG5jb25zdCB1bml0U2xpZGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5pdC1zbGlkZXItaW5wdXQnKTtcbmNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcbi8vIHNsaWRlci5jaGVja2VkID0gZmFsc2U7XG5jb25zdCBpY29uQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWNvbnQnKTtcbmNvbnN0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbicpO1xuY29uc3QgdGVtcENvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcC1jb250Jyk7XG5jb25zdCB0ZW1wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAnKTtcbmNvbnN0IG1pbk1heCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW4tbWF4Jyk7XG5jb25zdCB3ZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWRldGFpbHMnKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVscy1saWtlJyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVjaXBpdGF0aW9uJyk7XG5cbnNlYXJjaElucHV0Lm9uY2hhbmdlID0gKGUpID0+IHtzZWFyY2goc2VhcmNoSW5wdXQudmFsdWUpfTtcbnNlYXJjaEJ0bi5vbmNsaWNrID0gKGUpID0+IHtzZWFyY2goc2VhcmNoSW5wdXQudmFsdWUpfTtcblxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoKGlucHV0KXtcbiAgbGV0IHdlYXRoZXJPYmogPSBhd2FpdCBnZXREYXRhKGlucHV0KTtcbiAgaWYoIXdlYXRoZXJPYmope1xuICAgIHJldHVybjtcbiAgfVxuICB1cGRhdGVXZWF0aGVyQ2FyZChjdXJyZW50RGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDdXJyZW50RGF0YShkYXRhKXtcbiAgY3VycmVudERhdGEgPSBkYXRhO1xufTtcblxuZnVuY3Rpb24gZ2V0VGltZUluZm8ob2Zmc2V0KXtcbiAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICBsZXQgbG9jYWxUaW1lID0gZC5nZXRUaW1lKCk7XG4gIGxldCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSogNjAwMDBcbiAgbGV0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0O1xuICBsZXQgdGltZSA9IHV0YyArICgxMDAwICogb2Zmc2V0KTtcbiAgbGV0IG5kID0gbmV3IERhdGUodGltZSk7XG4gIGxldCBtaW5zID0gbmQuZ2V0TWludXRlcygpO1xuICBpZihtaW5zPDEwKXtcbiAgICBtaW5zID0gJzAnICsgbWlucztcbiAgfTtcbiAgbGV0IG15RGF0ZSA9IG5kLnRvRGF0ZVN0cmluZygpICsgJyAnICsgbmQuZ2V0SG91cnMoKSArICc6JyArIG1pbnM7XG4gIHJldHVybiBteURhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVXZWF0aGVyQ2FyZCh3ZWF0aGVyRGF0YSl7XG4gIGlmKCF3ZWF0aGVyRGF0YSl7XG4gICAgcmV0dXJuO1xuICB9O1xuICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAvLyBsb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHdlYXRoZXJDYXJkLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gIGNvbnNvbGUubG9nKGdldFRpbWVJbmZvKHdlYXRoZXJEYXRhLnRpbWV6b25lKSk7XG4gIGNpdHkudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5jaXR5ICsgJywnO1xuICBjb3VudHJ5LnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEuY291bnRyeTtcbiAgZGF0ZS50ZXh0Q29udGVudCA9IGdldFRpbWVJbmZvKHdlYXRoZXJEYXRhLnRpbWV6b25lKTtcbiAgdGVtcC50ZXh0Q29udGVudCA9IHBhcnNlRmxvYXQod2VhdGhlckRhdGEudGVtcCkudG9GaXhlZCgpICsgJ8KwJztcbiAgbWluTWF4LnRleHRDb250ZW50ID0gYCR7cGFyc2VGbG9hdCh3ZWF0aGVyRGF0YS50ZW1wTWF4KS50b0ZpeGVkKCl9wrAgfCAke3BhcnNlRmxvYXQod2VhdGhlckRhdGEudGVtcE1pbikudG9GaXhlZCgpfcKwYDtcbiAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbi50b1VwcGVyQ2FzZSgpO1xuICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSAnRkVFTFMgTElLRTogJyArIHBhcnNlRmxvYXQod2VhdGhlckRhdGEuZmVlbHNMaWtlKS50b0ZpeGVkKCkgKyAnwrAnO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9ICdIVU1JRElUWTogJysgd2VhdGhlckRhdGEuaHVtaWRpdHk7XG4gIGljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7d2VhdGhlckRhdGEuaWNvbn1AMngucG5nYDtcbiAgd2luZC50ZXh0Q29udGVudCA9ICdXSU5EIFNQRUVEOiAnICsgd2VhdGhlckRhdGEud2luZFNwZWVkICsgJ21wcyc7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnREYXRhKTtcbiAgLy9pZiBjaGVja2VkIHVuaXQ9PmltcGVyaWFsfHVuY2hlY2tlZCA8PSBjZWxjaXVzXG59XG5cbmZ1bmN0aW9uIHVuaXRDb252ZXJzaW9uKCl7XG4gIGlmKCF1bml0U2xpZGVySW5wdXQuY2hlY2tlZCl7XG4gICAgLy9jZWxjaXVzID0+IGZhaHJlbmhlaXRcbiAgICBjdXJyZW50RGF0YS50ZW1wID0gKChjdXJyZW50RGF0YS50ZW1wICogOS81KSArIDMyKS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1pbiA9ICgoY3VycmVudERhdGEudGVtcE1pbiAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNYXggPSAoKGN1cnJlbnREYXRhLnRlbXBNYXggKiA5LzUpICsgMzIpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS5mZWVsc0xpa2UgPSAoKGN1cnJlbnREYXRhLmZlZWxzTGlrZSAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGNvbnNvbGUubG9nKHt0ZW1wOmN1cnJlbnREYXRhLnRlbXAsdGVtcE1pbjpjdXJyZW50RGF0YS50ZW1wTWluLHRlbXBNYXg6Y3VycmVudERhdGEudGVtcE1heCxmZWVsc0xpa2U6Y3VycmVudERhdGEuZmVlbHNMaWtlfSk7XG4gIH0gZWxzZSB7XG4gICAgLy9mYWhyZW5oZWl0ID0+IGNlbGNpdXNcbiAgICBjdXJyZW50RGF0YS50ZW1wID0gKChjdXJyZW50RGF0YS50ZW1wIC0gMzIpICogNS85KS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1pbiA9ICgoY3VycmVudERhdGEudGVtcE1pbiAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLnRlbXBNYXggPSAoKGN1cnJlbnREYXRhLnRlbXBNYXggLSAzMikgKiA1LzkpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS5mZWVsc0xpa2UgPSAoKGN1cnJlbnREYXRhLmZlZWxzTGlrZSAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGNvbnNvbGUubG9nKHt0ZW1wOmN1cnJlbnREYXRhLnRlbXAsdGVtcE1pbjpjdXJyZW50RGF0YS50ZW1wTWluLHRlbXBNYXg6Y3VycmVudERhdGEudGVtcE1heCxmZWVsc0xpa2U6Y3VycmVudERhdGEuZmVlbHNMaWtlfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2xpZGVyRnVuYygpe1xuICAvL2NoZWNrZWRcbiAgLy8gY29uc29sZS5sb2codW5pdFNsaWRlcklucHV0LmNoZWNrZWQpO1xuICBpZih1bml0U2xpZGVySW5wdXQuY2hlY2tlZCl7XG4gICAgdW5pdFNsaWRlcklucHV0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB1bml0U2xpZGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnO1xuICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdjaGVja2VkJyk7XG4gICAgLy9jb252ZXJ0IHVuaXRzXG4gIC8vdW5jaGVja2VkXG4gIH0gZWxzZSB7XG4gICAgdW5pdFNsaWRlcklucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgIHVuaXRTbGlkZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnZmxleC1lbmQnO1xuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdjaGVja2VkJyk7XG4gICAgLy9jb252ZXJ0IHVuaXRzXG4gIH1cbiAgdW5pdENvbnZlcnNpb24oKTtcbiAgdXBkYXRlV2VhdGhlckNhcmQoY3VycmVudERhdGEpO1xufVxuXG51bml0U2xpZGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICBzbGlkZXJGdW5jKCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUVycm9yTXNnKG1lc3NhZ2Upe1xuICB3ZWF0aGVyQ2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBlcnJvck1zZy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG59XG4vLyBleHBvcnQgZnVuY3Rpb24gZGlzcGxheUxvYWRpbmdNc2coKXtcbi8vICAgd2VhdGhlckNhcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbi8vICAgbG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuLy8gICBsb2FkaW5nTXNnLnRleHRDb250ZW50ID0gJy4uLic7XG4vLyB9IiwiaW1wb3J0IHsgZGlzcGxheUVycm9yTXNnLCBkaXNwbGF5TG9hZGluZ01zZywgdXBkYXRlQ3VycmVudERhdGEgfSBmcm9tIFwiLi9ET01cIjtcblxuZnVuY3Rpb24gcHVsbFdlYXRoZXJEYXRhKGNpdHkpe1xuICBjb25zdCByZXF1ZXN0ID0gZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmQVBQSUQ9ZTBjYmRkNTRlZTBmNjI1MjdkNzA3ZjIxY2U2ZDJlMGRgLHttb2RlOidjb3JzJ30pXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgLy9ydW5zIGlmIGlucHV0IGlzIG5vdCBhIGNpdHlcbiAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KXtcbiAgICAgICAgZGlzcGxheUVycm9yTXNnKCdFcnJvciEgUGxlYXNlIG1ha2Ugc3VyZSB5b3VyIGlucHV0IGlzIHZhbGlkLicpXG4gICAgICAgIHJldHVybiA7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIFxuICAgIC8vIHJ1bnMgaWYgcmVxdWVzdCB3YXMgcmVqZWN0ZWRcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgY29uc29sZS5lcnJvcihgRVJST1I6JHtlcnJvcn1gKTtcbiAgICAgIGRpc3BsYXlFcnJvck1zZygnRXJyb3IhIHJlcXVlc3Qgd2FzIHJlamVjdGVkIScpO1xuICAgIH0pO1xuICByZXR1cm4gcmVxdWVzdDtcbn07XG5cbi8vaWYgZmV0Y2ggZmFpbHMgaGlkZSB3ZWF0aGVyIGNhcmQgYW5kIGRpc3BsYXkgZXJyb3IgbWVzc2FnZVxuXG5mdW5jdGlvbiBwYXJzZVdlYXRoZXJEYXRhKHdlYXRoZXJPYmope1xuICBpZighd2VhdGhlck9iail7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2cod2VhdGhlck9iaik7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSB7fTtcbiAgICBsZXQgZGF0YSA9IHdlYXRoZXJPYmo7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIFxuICAgIHdlYXRoZXJEYXRhLnRlbXAgPSBkYXRhLm1haW4udGVtcDtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWluID0gZGF0YS5tYWluLnRlbXBfbWluO1xuICAgIHdlYXRoZXJEYXRhLnRlbXBNYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgd2VhdGhlckRhdGEuZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgd2VhdGhlckRhdGEuaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHkgKyAnJSc7XG4gICAgLy8gd2VhdGhlckRhdGEud2VhdGhlciA9IGRhdGEud2VhdGhlcjtcbiAgICB3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICB3ZWF0aGVyRGF0YS5pY29uID0gZGF0YS53ZWF0aGVyWzBdLmljb247XG4gICAgLy8gZGF0YS53ZWF0aGVyIGlzIGFuIGFycmF5IG9mIHRoZSBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xuICAgIHdlYXRoZXJEYXRhLndpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICB3ZWF0aGVyRGF0YS5jbG91ZHMgPSBkYXRhLmNsb3Vkcy5hbGwgKyAnJSc7XG4gICAgd2VhdGhlckRhdGEuY291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XG4gICAgd2VhdGhlckRhdGEudGltZXpvbmUgPSBkYXRhLnRpbWV6b25lO1xuICAgIHdlYXRoZXJEYXRhLmNpdHkgPSBkYXRhLm5hbWU7XG4gIFxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy9jYW4gdGhyb3cgZXJyb3IgaWYgdGhlIGRhdGEgdmFyaWFibGUgaXMgdW5kZWZpbmVkXG4gICAgZGlzcGxheUVycm9yTXNnKGVycm9yKTtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYXRhKGlucHV0KXtcbiAgY29uc3QgcmF3ID0gYXdhaXQgcHVsbFdlYXRoZXJEYXRhKGlucHV0KTtcbiAgY29uc3QgZGF0YSA9IHBhcnNlV2VhdGhlckRhdGEocmF3KTtcbiAgdXBkYXRlQ3VycmVudERhdGEoZGF0YSk7XG4gIHJldHVybiBkYXRhO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9QVUxMLCBPUkdBTklaRSwgRElTUExBWVxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHsgdXBkYXRlV2VhdGhlckNhcmQgfSBmcm9tIFwiLi9ET01cIjtcblxud2luZG93Lm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uKCl7XG4gIGxldCBvbmxvYWREYXRhID0gYXdhaXQgZ2V0RGF0YSgnbmV3IHlvcmsnKTtcbiAgdXBkYXRlV2VhdGhlckNhcmQob25sb2FkRGF0YSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9