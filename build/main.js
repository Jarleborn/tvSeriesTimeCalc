require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_seriesInfoModule__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);
__webpack_require__(7);



var fetch = __webpack_require__(9);
var FormData = __webpack_require__(6);
var express = __webpack_require__(5);
var app = express();
var bodyParser = __webpack_require__(3);

app.use(bodyParser.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/index.html')
  //res.sendfile(__dirname + '/public/index.html')
  res.send('hej');
});

app.get('/ping', function (req, res) {
  res.send('bajskorv');
});
app.post('/getinfo', function (req, res) {
  console.log(req.body);
  if (req.body.series) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__modules_seriesInfoModule__["a" /* getSeries */])(req.body.series).then(function (result) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__modules_seriesInfoModule__["b" /* getSeriesInfo */])(result).then(function (result) {
        res.send(result);
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    res.send('error bre');
  }
});

app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
});
/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function () {
  return '68664d5d0f4d6d26bf7ea1ec10e6e25b';
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return getSeries; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return getSeriesInfo; });

var mdb = __webpack_require__(8)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])());

function getSeries(seriesName) {
  console.log(seriesName);
  return new Promise(function (resolve, reject) {
    mdb.searchTv({ query: seriesName }, function (err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res.results[0]);
    });
  });
}

function getSeriesInfo(series) {
  return new Promise(function (resolve, reject) {
    mdb.tvInfo({ id: series.id }, function (err, res) {

      if (err) {
        return reject(err);
      }
      resolve({
        'time': res.episode_run_time[0] * res.number_of_episodes,
        'name': res.name,
        'blur': res.overview,
        'airedAt': res.first_air_date,
        'days': Math.round(res.episode_run_time[0] * res.number_of_episodes / 60 / 24 * 10) / 10,
        'picture': 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + res.poster_path,
        'background': 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2//' + res.backdrop_path
      });
    });
  });
}



/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("cors");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("form-data");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("import-export");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("moviedb");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("node-fetch");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }
/******/ ]);
//# sourceMappingURL=main.map