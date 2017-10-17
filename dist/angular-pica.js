/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(1);
var angular_pica_component_1 = __webpack_require__(2);
var angular_pica_service_1 = __webpack_require__(3);
exports.default = angular
    .module("angularPica", [])
    .service("picaService", angular_pica_service_1.default)
    .component("picaImg", new angular_pica_component_1.default());


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var picaImgController = /** @class */ (function () {
    picaImgController.$inject = ["picaService"];
    function picaImgController(picaService) {
        "ngInject";
        this.picaService = picaService;
    }
    picaImgController.prototype.$onInit = function () {
        var _this = this;
        console.log(this.src, this.width, this.height);
        var canvas = document.getElementById('viewport');
        var context = canvas.getContext("2d");
        var newCanvas = document.createElement('canvas');
        newCanvas.height = this.height;
        newCanvas.width = this.width;
        var image = new Image();
        image.src = this.src;
        image.onload = function () {
            console.log("image", image, image.width, image.height);
            var oldCanvas = document.createElement('canvas');
            oldCanvas.height = image.height;
            oldCanvas.width = image.width;
            var oldContext = oldCanvas.getContext("2d");
            oldContext.drawImage(image, 0, 0, image.width, image.height);
            _this.picaService.resize(oldCanvas, newCanvas).then(function (resized) {
                console.log("resized", resized, resized.getContext("2d"));
                context.drawImage(resized, 0, 0);
            }, function (error) {
                console.error("error", error);
            });
        };
    };
    return picaImgController;
}());
var picaComponent = /** @class */ (function () {
    function picaComponent() {
        this.bindings = {
            src: '@',
            height: '<',
            width: '<'
        };
        this.controller = picaImgController;
        this.template = "\n      <canvas id=\"viewport\" width=\"{{ $ctrl.width }}\" height=\"{{ $ctrl.height }}\"></canvas>\n    ";
    }
    return picaComponent;
}());
exports.default = picaComponent;
;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pica = __webpack_require__(4);
var default_1 = /** @class */ (function () {
    default_1.$inject = ["$q"];
    function default_1($q) {
        "ngInject";
        this.$q = $q;
        //console.log("pica", pica);
        this.resizer = pica();
        //console.log("resizer", this.resizer);
    }
    default_1.prototype.resize = function (from, to, options) {
        var deferred = this.$q.defer();
        this.resizer.resize(from, to, options).then(function (to) {
            deferred.resolve(to);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    default_1.prototype.resizeBuffer = function (options) {
        var deferred = this.$q.defer();
        this.resizer.resizeBuffer(options).then(function (output) {
            deferred.resolve(output);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    return default_1;
}());
exports.default = default_1;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = pica;

/***/ })
/******/ ]);