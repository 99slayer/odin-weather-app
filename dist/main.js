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
/* harmony export */   "test": () => (/* binding */ test)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");


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
  let weatherObj = await (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getData)(searchInput.value);
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

function test(){
  console.log('test');
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
    // weatherData.description = data.weather.description;
    // weatherData.icon = data.weather.icon;
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
//PULL, ORGANIZE, DISPLAY

const btn = document.querySelector('#search-button');

btn.onclick = function(){
  // pullWeatherData('edmonton');
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getData)('calgary');
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixtREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEQ2Qjs7QUFFN0I7QUFDQSw2RUFBNkUsS0FBSyx1REFBdUQsWUFBWTtBQUNySjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQyxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzdEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBLEVBQUUsbURBQU87QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxubGV0IGN1cnJlbnREYXRhO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJ1dHRvbicpO1xuXG5jb25zdCB3ZWF0aGVyQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWNhcmQnKTtcbmNvbnN0IGFyZWFJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEtaW5mbycpO1xuY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5Jyk7XG5jb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnknKTtcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZScpO1xuY29uc3QgdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XG5jb25zdCB1bml0U2xpZGVyQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNsaWRlci1jb250Jyk7XG5jb25zdCB1bml0U2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXQtc2xpZGVyJyk7XG5jb25zdCBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24nKTtcbmNvbnN0IHRlbXBDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAtY29udCcpO1xuY29uc3QgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wJyk7XG5jb25zdCBtaW5NYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluLW1heCcpO1xuY29uc3Qgd2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1kZXRhaWxzJyk7XG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlbHMtbGlrZScpO1xuY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB3aW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlY2lwaXRhdGlvbicpO1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoZSk9PntcbiAgLy9nZXRzIHVzIHdlYXRoZXIgZGF0YVxuICBsZXQgd2VhdGhlck9iaiA9IGF3YWl0IGdldERhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xuICBpZighd2VhdGhlck9iail7XG4gICAgLy9kaXNwbGF5IGVycm9yIG1lc3NhZ2VcbiAgICByZXR1cm47XG4gIH1cbiAgdXBkYXRlV2VhdGhlckNhcmQod2VhdGhlck9iaik7XG5cbiAgLy9maW5pc2hlZEdldHRpbmdEYXRhIGV2ZW50KipcbiAgLy9tYWtlIGN1c3RvbSBldmVudCBmb3Igd2hlbiBkYXRhIGlzIGZpbmlzaGVkIGJlaW5nIHB1bGxlZFxuICAvLyBjb25zb2xlLmxvZyh3ZWF0aGVyT2JqKTtcbiAgLy9maWxsIG91dCB3ZWF0aGVyIGNhcmQgZnVuY3Rpb24gKHdlYXRoZXJPYmopO1xuICAvLyBjdXJyZW50RGF0YSA9IGdldERhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAvLyBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG59KTtcblxuZnVuY3Rpb24gdXBkYXRlV2VhdGhlckNhcmQod2VhdGhlckRhdGEpe1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG59IiwiaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuL0RPTVwiO1xuXG5mdW5jdGlvbiBwdWxsV2VhdGhlckRhdGEoY2l0eSl7XG4gIGNvbnN0IHJlcXVlc3QgPSBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZBUFBJRD1lMGNiZGQ1NGVlMGY2MjUyN2Q3MDdmMjFjZTZkMmUwZGAse21vZGU6J2NvcnMnfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIC8vcnVucyBpZiBpbnB1dCBpcyBub3QgYSBjaXR5XG4gICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgIHJldHVybiA7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIFxuICAgIC8vIHJ1bnMgaWYgcmVxdWVzdCB3YXMgcmVqZWN0ZWRcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgY29uc29sZS5lcnJvcihgRVJST1I6JHtlcnJvcn1gKTtcbiAgICB9KTtcbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG4vL2lmIGZldGNoIGZhaWxzIGhpZGUgd2VhdGhlciBjYXJkIGFuZCBkaXNwbGF5IGVycm9yIG1lc3NhZ2VcblxuZnVuY3Rpb24gcGFyc2VXZWF0aGVyRGF0YSh3ZWF0aGVyT2JqKXtcbiAgaWYoIXdlYXRoZXJPYmope1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0ge307XG4gICAgbGV0IGRhdGEgPSB3ZWF0aGVyT2JqO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICBcbiAgICB3ZWF0aGVyRGF0YS50ZW1wID0gZGF0YS5tYWluLnRlbXA7XG4gICAgd2VhdGhlckRhdGEudGVtcE1pbiA9IGRhdGEubWFpbi50ZW1wX21pbjtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIHdlYXRoZXJEYXRhLmZlZWxzTGlrZSA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIHdlYXRoZXJEYXRhLmh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5ICsgJyUnO1xuICAgIC8vIHdlYXRoZXJEYXRhLndlYXRoZXIgPSBkYXRhLndlYXRoZXI7XG4gICAgLy8gd2VhdGhlckRhdGEuZGVzY3JpcHRpb24gPSBkYXRhLndlYXRoZXIuZGVzY3JpcHRpb247XG4gICAgLy8gd2VhdGhlckRhdGEuaWNvbiA9IGRhdGEud2VhdGhlci5pY29uO1xuICAgIC8vIGRhdGEud2VhdGhlciBpcyBhbiBhcnJheSBvZiB0aGUgY3VycmVudCB3ZWF0aGVyIGNvbmRpdGlvbnNcbiAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgd2VhdGhlckRhdGEuY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsICsgJyUnO1xuICAgIHdlYXRoZXJEYXRhLmNvdW50cnkgPSBkYXRhLnN5cy5jb3VudHJ5O1xuICAgIHdlYXRoZXJEYXRhLnRpbWV6b25lID0gZGF0YS50aW1lem9uZTtcbiAgICB3ZWF0aGVyRGF0YS5jaXR5ID0gZGF0YS5uYW1lO1xuICBcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vY2FuIHRocm93IGVycm9yIGlmIHRoZSBkYXRhIHZhcmlhYmxlIGlzIHVuZGVmaW5lZFxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERhdGEoaW5wdXQpe1xuICBjb25zdCByYXcgPSBhd2FpdCBwdWxsV2VhdGhlckRhdGEoaW5wdXQpO1xuICBjb25zdCBkYXRhID0gcGFyc2VXZWF0aGVyRGF0YShyYXcpO1xuICByZXR1cm4gZGF0YTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vUFVMTCwgT1JHQU5JWkUsIERJU1BMQVlcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnV0dG9uJyk7XG5cbmJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgLy8gcHVsbFdlYXRoZXJEYXRhKCdlZG1vbnRvbicpO1xuICBnZXREYXRhKCdjYWxnYXJ5Jyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9