/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseWeatherData": () => (/* binding */ parseWeatherData),
/* harmony export */   "pullWeatherData": () => (/* binding */ pullWeatherData)
/* harmony export */ });
function pullWeatherData(city){
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
function parseWeatherData(weatherPromise){
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
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.parseWeatherData)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.pullWeatherData)('calgary'));
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQLG9FQUFvRSxLQUFLLHVEQUF1RCxZQUFZO0FBQzVJO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7Ozs7VUMzQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2dFO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQSxFQUFFLDREQUFnQixDQUFDLDJEQUFlO0FBQ2xDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHB1bGxXZWF0aGVyRGF0YShjaXR5KXtcbiAgcmV0dXJuIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJkFQUElEPWUwY2JkZDU0ZWUwZjYyNTI3ZDcwN2YyMWNlNmQyZTBkYCx7bW9kZTonY29ycyd9KVxuICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICAvLyAudGhlbigocmVzcG9uc2UpPT57XG4gICAgLy8gICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAvLyB9KVxuICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbn07XG5cbi8vd2VhdGhlclByb21pc2Ugc2hvdWxkIGJlIGEgcHJvbWlzZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlV2VhdGhlckRhdGEod2VhdGhlclByb21pc2Upe1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IHt9O1xuICB3ZWF0aGVyUHJvbWlzZS50aGVuKChkYXRhKT0+e1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHdlYXRoZXJEYXRhLnRlbXAgPSBkYXRhLm1haW4udGVtcDtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWluID0gZGF0YS5tYWluLnRlbXBfbWluO1xuICAgIHdlYXRoZXJEYXRhLnRlbXBNYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgd2VhdGhlckRhdGEuZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgd2VhdGhlckRhdGEuaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgLy8gd2VhdGhlckRhdGEud2VhdGhlciA9IGRhdGEud2VhdGhlci5tYWluO1xuICAgIC8vIHdlYXRoZXJEYXRhLmRlc2NyaXB0aW9uID0gZGF0YS53ZWF0aGVyLmRlc2NyaXB0aW9uO1xuICAgIC8vIHdlYXRoZXJEYXRhLmljb24gPSBkYXRhLndlYXRoZXIuaWNvbjtcbiAgICAvLyB3ZWF0aGVyIGlzIGFuIGFycmF5IG9mIGFsbCBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9ucyBpbiBhIGNpdHlcbiAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgd2VhdGhlckRhdGEud2luZERlZyA9IGRhdGEud2luZC5kZWc7XG4gICAgd2VhdGhlckRhdGEuY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsO1xuICAgIHdlYXRoZXJEYXRhLnZpc2liaWxpdHkgPSBkYXRhLnZpc2liaWxpdHk7XG4gICAgd2VhdGhlckRhdGEuY291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XG4gICAgd2VhdGhlckRhdGEudGltZXpvbmUgPSBkYXRhLnRpbWV6b25lO1xuICAgIHdlYXRoZXJEYXRhLmNpdHkgPSBkYXRhLm5hbWU7XG4gICAgXG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycm9yKT0+e1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9KTtcbiAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufTtcblxuLy9hbHNvIGNhbiBkaXNwbGF5IDVkYXkgZm9yZWNhc3QiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vUFVMTCwgT1JHQU5JWkUsIERJU1BMQVlcbmltcG9ydCB7IHB1bGxXZWF0aGVyRGF0YSwgcGFyc2VXZWF0aGVyRGF0YSB9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idXR0b24nKTtcblxuYnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAvLyBwdWxsV2VhdGhlckRhdGEoJ2VkbW9udG9uJyk7XG4gIHBhcnNlV2VhdGhlckRhdGEocHVsbFdlYXRoZXJEYXRhKCdjYWxnYXJ5JykpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==