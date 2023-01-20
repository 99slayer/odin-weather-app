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
  let myDate = nd.toDateString() + ' ' + nd.getHours() + ':' + nd.getMinutes();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0IsNEJBQTRCOztBQUU1QjtBQUNBLHlCQUF5QixtREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQ0FBMEMsTUFBTSwwQ0FBMEM7QUFDcEg7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGlCQUFpQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4R0FBOEc7QUFDL0gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOEdBQThHO0FBQy9IO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNwSDBDOztBQUUxQztBQUNBLDZFQUE2RSxLQUFLLHVEQUF1RCxZQUFZO0FBQ3JKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixNQUFNO0FBQ25DLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxFQUFFLHVEQUFpQjtBQUNuQjtBQUNBOzs7Ozs7O1VDOURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDc0M7QUFDSTs7QUFFMUM7QUFDQSx5QkFBeUIsbURBQU87QUFDaEMsRUFBRSx1REFBaUI7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbmxldCBjdXJyZW50RGF0YTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpO1xuc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYnV0dG9uJyk7XG5cbmNvbnN0IHdlYXRoZXJDYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXItY2FyZCcpO1xuY29uc3QgYXJlYUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJlYS1pbmZvJyk7XG5jb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKTtcbmNvbnN0IGNvdW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyeScpO1xuY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlJyk7XG5jb25zdCB0aW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKTtcbmNvbnN0IHVuaXRTbGlkZXJDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXQtc2xpZGVyLWNvbnQnKTtcbmNvbnN0IHVuaXRTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5pdC1zbGlkZXInKTtcbmNvbnN0IHVuaXRTbGlkZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNsaWRlci1pbnB1dCcpO1xuY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpO1xuLy8gc2xpZGVyLmNoZWNrZWQgPSBmYWxzZTtcbmNvbnN0IGljb25Db250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tY29udCcpO1xuY29uc3QgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uJyk7XG5jb25zdCB0ZW1wQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wLWNvbnQnKTtcbmNvbnN0IHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcCcpO1xuY29uc3QgbWluTWF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbi1tYXgnKTtcbmNvbnN0IHdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXItZGV0YWlscycpO1xuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZWxzLWxpa2UnKTtcbmNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyk7XG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuY29uc3Qgd2luZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG5jb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZWNpcGl0YXRpb24nKTtcblxuc2VhcmNoSW5wdXQub25jaGFuZ2UgPSAoZSkgPT4ge3NlYXJjaChzZWFyY2hJbnB1dC52YWx1ZSl9O1xuc2VhcmNoQnRuLm9uY2xpY2sgPSAoZSkgPT4ge3NlYXJjaChzZWFyY2hJbnB1dC52YWx1ZSl9O1xuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2goaW5wdXQpe1xuICBsZXQgd2VhdGhlck9iaiA9IGF3YWl0IGdldERhdGEoaW5wdXQpO1xuICBpZighd2VhdGhlck9iail7XG4gICAgLy9zaG91bGQgaGF2ZSBzb21lIGtpbmQgb2YgZXJyb3IgZGlzcGxheWVkXG4gICAgcmV0dXJuO1xuICB9XG4gIHVwZGF0ZVdlYXRoZXJDYXJkKGN1cnJlbnREYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnREYXRhKGRhdGEpe1xuICBjdXJyZW50RGF0YSA9IGRhdGE7XG59O1xuXG5mdW5jdGlvbiBnZXRUaW1lSW5mbyhvZmZzZXQpe1xuICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gIGxldCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKTtcbiAgbGV0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpKiA2MDAwMFxuICBsZXQgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXQ7XG4gIGxldCB0aW1lID0gdXRjICsgKDEwMDAgKiBvZmZzZXQpO1xuICBsZXQgbmQgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgbGV0IG15RGF0ZSA9IG5kLnRvRGF0ZVN0cmluZygpICsgJyAnICsgbmQuZ2V0SG91cnMoKSArICc6JyArIG5kLmdldE1pbnV0ZXMoKTtcbiAgcmV0dXJuIG15RGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJDYXJkKHdlYXRoZXJEYXRhKXtcbiAgY29uc29sZS5sb2coZ2V0VGltZUluZm8od2VhdGhlckRhdGEudGltZXpvbmUpKTtcbiAgY2l0eS50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmNpdHkgKyAnLCc7XG4gIGNvdW50cnkudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5jb3VudHJ5O1xuICBkYXRlLnRleHRDb250ZW50ID0gZ2V0VGltZUluZm8od2VhdGhlckRhdGEudGltZXpvbmUpO1xuICB0ZW1wLnRleHRDb250ZW50ID0gcGFyc2VGbG9hdCh3ZWF0aGVyRGF0YS50ZW1wKS50b0ZpeGVkKCkgKyAnwrAnO1xuICBtaW5NYXgudGV4dENvbnRlbnQgPSBgJHtwYXJzZUZsb2F0KHdlYXRoZXJEYXRhLnRlbXBNYXgpLnRvRml4ZWQoKX3CsCB8ICR7cGFyc2VGbG9hdCh3ZWF0aGVyRGF0YS50ZW1wTWluKS50b0ZpeGVkKCl9wrBgO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHdlYXRoZXJEYXRhLmRlc2NyaXB0aW9uLnRvVXBwZXJDYXNlKCk7XG4gIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9ICdGRUVMUyBMSUtFOiAnICsgcGFyc2VGbG9hdCh3ZWF0aGVyRGF0YS5mZWVsc0xpa2UpLnRvRml4ZWQoKSArICfCsCc7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gJ0hVTUlESVRZOiAnKyB3ZWF0aGVyRGF0YS5odW1pZGl0eTtcbiAgaWNvbi5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHt3ZWF0aGVyRGF0YS5pY29ufUAyeC5wbmdgO1xuICB3aW5kLnRleHRDb250ZW50ID0gJ1dJTkQgU1BFRUQ6ICcgKyB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgKyAnbXBzJztcbiAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAvL2lmIGNoZWNrZWQgdW5pdD0+aW1wZXJpYWx8dW5jaGVja2VkIDw9IGNlbGNpdXNcbn1cblxuZnVuY3Rpb24gdW5pdENvbnZlcnNpb24oKXtcbiAgaWYoIXVuaXRTbGlkZXJJbnB1dC5jaGVja2VkKXtcbiAgICAvL2NlbGNpdXMgPT4gZmFocmVuaGVpdFxuICAgIGN1cnJlbnREYXRhLnRlbXAgPSAoKGN1cnJlbnREYXRhLnRlbXAgKiA5LzUpICsgMzIpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS50ZW1wTWluID0gKChjdXJyZW50RGF0YS50ZW1wTWluICogOS81KSArIDMyKS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1heCA9ICgoY3VycmVudERhdGEudGVtcE1heCAqIDkvNSkgKyAzMikudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLmZlZWxzTGlrZSA9ICgoY3VycmVudERhdGEuZmVlbHNMaWtlICogOS81KSArIDMyKS50b0ZpeGVkKCk7XG4gICAgY29uc29sZS5sb2coe3RlbXA6Y3VycmVudERhdGEudGVtcCx0ZW1wTWluOmN1cnJlbnREYXRhLnRlbXBNaW4sdGVtcE1heDpjdXJyZW50RGF0YS50ZW1wTWF4LGZlZWxzTGlrZTpjdXJyZW50RGF0YS5mZWVsc0xpa2V9KTtcbiAgfSBlbHNlIHtcbiAgICAvL2ZhaHJlbmhlaXQgPT4gY2VsY2l1c1xuICAgIGN1cnJlbnREYXRhLnRlbXAgPSAoKGN1cnJlbnREYXRhLnRlbXAgLSAzMikgKiA1LzkpLnRvRml4ZWQoKTtcbiAgICBjdXJyZW50RGF0YS50ZW1wTWluID0gKChjdXJyZW50RGF0YS50ZW1wTWluIC0gMzIpICogNS85KS50b0ZpeGVkKCk7XG4gICAgY3VycmVudERhdGEudGVtcE1heCA9ICgoY3VycmVudERhdGEudGVtcE1heCAtIDMyKSAqIDUvOSkudG9GaXhlZCgpO1xuICAgIGN1cnJlbnREYXRhLmZlZWxzTGlrZSA9ICgoY3VycmVudERhdGEuZmVlbHNMaWtlIC0gMzIpICogNS85KS50b0ZpeGVkKCk7XG4gICAgY29uc29sZS5sb2coe3RlbXA6Y3VycmVudERhdGEudGVtcCx0ZW1wTWluOmN1cnJlbnREYXRhLnRlbXBNaW4sdGVtcE1heDpjdXJyZW50RGF0YS50ZW1wTWF4LGZlZWxzTGlrZTpjdXJyZW50RGF0YS5mZWVsc0xpa2V9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzbGlkZXJGdW5jKCl7XG4gIC8vY2hlY2tlZFxuICAvLyBjb25zb2xlLmxvZyh1bml0U2xpZGVySW5wdXQuY2hlY2tlZCk7XG4gIGlmKHVuaXRTbGlkZXJJbnB1dC5jaGVja2VkKXtcbiAgICB1bml0U2xpZGVySW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuICAgIHVuaXRTbGlkZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnZmxleC1zdGFydCc7XG4gICAgc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2NoZWNrZWQnKTtcbiAgICAvL2NvbnZlcnQgdW5pdHNcbiAgLy91bmNoZWNrZWRcbiAgfSBlbHNlIHtcbiAgICB1bml0U2xpZGVySW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgdW5pdFNsaWRlci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LWVuZCc7XG4gICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2NoZWNrZWQnKTtcbiAgICAvL2NvbnZlcnQgdW5pdHNcbiAgfVxuICB1bml0Q29udmVyc2lvbigpO1xuICB1cGRhdGVXZWF0aGVyQ2FyZChjdXJyZW50RGF0YSk7XG59XG5cbnVuaXRTbGlkZXIub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHNsaWRlckZ1bmMoKTtcbn07XG5cbmZ1bmN0aW9uIHBsYXlMb2FkaW5nQW5pbWF0aW9uKCl7XG5cbn0iLCJpbXBvcnQgeyB1cGRhdGVDdXJyZW50RGF0YSB9IGZyb20gXCIuL0RPTVwiO1xuXG5mdW5jdGlvbiBwdWxsV2VhdGhlckRhdGEoY2l0eSl7XG4gIGNvbnN0IHJlcXVlc3QgPSBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZBUFBJRD1lMGNiZGQ1NGVlMGY2MjUyN2Q3MDdmMjFjZTZkMmUwZGAse21vZGU6J2NvcnMnfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIC8vcnVucyBpZiBpbnB1dCBpcyBub3QgYSBjaXR5XG4gICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgIHJldHVybiA7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIFxuICAgIC8vIHJ1bnMgaWYgcmVxdWVzdCB3YXMgcmVqZWN0ZWRcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgY29uc29sZS5lcnJvcihgRVJST1I6JHtlcnJvcn1gKTtcbiAgICB9KTtcbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG4vL2lmIGZldGNoIGZhaWxzIGhpZGUgd2VhdGhlciBjYXJkIGFuZCBkaXNwbGF5IGVycm9yIG1lc3NhZ2VcblxuZnVuY3Rpb24gcGFyc2VXZWF0aGVyRGF0YSh3ZWF0aGVyT2JqKXtcbiAgaWYoIXdlYXRoZXJPYmope1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0ge307XG4gICAgbGV0IGRhdGEgPSB3ZWF0aGVyT2JqO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICBcbiAgICB3ZWF0aGVyRGF0YS50ZW1wID0gZGF0YS5tYWluLnRlbXA7XG4gICAgd2VhdGhlckRhdGEudGVtcE1pbiA9IGRhdGEubWFpbi50ZW1wX21pbjtcbiAgICB3ZWF0aGVyRGF0YS50ZW1wTWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIHdlYXRoZXJEYXRhLmZlZWxzTGlrZSA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIHdlYXRoZXJEYXRhLmh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5ICsgJyUnO1xuICAgIC8vIHdlYXRoZXJEYXRhLndlYXRoZXIgPSBkYXRhLndlYXRoZXI7XG4gICAgd2VhdGhlckRhdGEuZGVzY3JpcHRpb24gPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgd2VhdGhlckRhdGEuaWNvbiA9IGRhdGEud2VhdGhlclswXS5pY29uO1xuICAgIC8vIGRhdGEud2VhdGhlciBpcyBhbiBhcnJheSBvZiB0aGUgY3VycmVudCB3ZWF0aGVyIGNvbmRpdGlvbnNcbiAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgd2VhdGhlckRhdGEuY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsICsgJyUnO1xuICAgIHdlYXRoZXJEYXRhLmNvdW50cnkgPSBkYXRhLnN5cy5jb3VudHJ5O1xuICAgIHdlYXRoZXJEYXRhLnRpbWV6b25lID0gZGF0YS50aW1lem9uZTtcbiAgICB3ZWF0aGVyRGF0YS5jaXR5ID0gZGF0YS5uYW1lO1xuICBcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vY2FuIHRocm93IGVycm9yIGlmIHRoZSBkYXRhIHZhcmlhYmxlIGlzIHVuZGVmaW5lZFxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERhdGEoaW5wdXQpe1xuICBjb25zdCByYXcgPSBhd2FpdCBwdWxsV2VhdGhlckRhdGEoaW5wdXQpO1xuICBjb25zdCBkYXRhID0gcGFyc2VXZWF0aGVyRGF0YShyYXcpO1xuICB1cGRhdGVDdXJyZW50RGF0YShkYXRhKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL1BVTEwsIE9SR0FOSVpFLCBESVNQTEFZXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5pbXBvcnQgeyB1cGRhdGVXZWF0aGVyQ2FyZCB9IGZyb20gXCIuL0RPTVwiO1xuXG53aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24oKXtcbiAgbGV0IG9ubG9hZERhdGEgPSBhd2FpdCBnZXREYXRhKCduZXcgeW9yaycpO1xuICB1cGRhdGVXZWF0aGVyQ2FyZChvbmxvYWREYXRhKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=