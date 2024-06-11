/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "00de":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1787":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_aac92d7a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("00de");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_aac92d7a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_aac92d7a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2086":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_478443ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("760c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_478443ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_478443ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2649":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomModal_vue_vue_type_style_index_0_id_385e497a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e050");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomModal_vue_vue_type_style_index_0_id_385e497a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomModal_vue_vue_type_style_index_0_id_385e497a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "29e6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_01f764ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("df2f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_01f764ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_01f764ae_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2a2d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/run.1a44e751.gif";

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=1e87bc7e
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('router-view');
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=1e87bc7e

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js
/* harmony default export */ var Appvue_type_script_lang_js = ({
  name: 'App'
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
 /* harmony default export */ var src_Appvue_type_script_lang_js = (Appvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=1e87bc7e&prod&lang=css
var Appvue_type_style_index_0_id_1e87bc7e_prod_lang_css = __webpack_require__("fd75");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=template&id=01f764ae&scoped=true
var ClientViewvue_type_template_id_01f764ae_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('div', [_c('audio', {
    ref: "waitingMusic",
    attrs: {
      "src": __webpack_require__("edbe"),
      "loop": ""
    }
  }), _c('audio', {
    ref: "buttonSound",
    attrs: {
      "src": __webpack_require__("89f0"),
      "preload": "auto"
    }
  })]), !_vm.gameEnd ? _c('MainScreen', {
    ref: "mainScreen",
    on: {
      "enter-game": _vm.enterGame
    }
  }) : _vm._e(), !_vm.gameEnd ? _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "layout_container"
  }, [_c('div', {
    attrs: {
      "id": "back-button"
    }
  }, [_c('div', {
    staticClass: "back-button"
  }), _vm.showGameArea ? _c('div', {
    staticClass: "currentPosition",
    attrs: {
      "id": "currentPosition"
    }
  }, [_vm._v(" " + _vm._s(_vm.currentPosition) + " ")]) : _vm._e(), _vm.showMyCharacter ? _c('div', {
    staticClass: "myEmojiBox",
    attrs: {
      "id": "myEmoji"
    }
  }, [_c('h5', {
    staticClass: "me"
  }, [_vm._v(_vm._s(_vm.isHost))]), _c('span', {
    staticClass: "myCharacter"
  }, [_vm._v(_vm._s(_vm.myEmoji))]), _vm.gameStart && _vm.currentRank ? _c('div', [_c('span', {
    staticClass: "myRank"
  }, [_vm._v("현재 " + _vm._s(_vm.currentRank) + "등!")])]) : _vm._e()]) : _vm._e()])]), _c('div', {
    staticClass: "game_area_wrapper"
  }, [_c('div', {
    staticClass: "game_area_container"
  }, [_c('img', {
    staticClass: "console-img",
    attrs: {
      "src": __webpack_require__("e5f5"),
      "alt": "Console Background"
    }
  }), _vm.showGameArea ? _c('GameArea', {
    ref: "gameArea",
    attrs: {
      "participants": _vm.participants,
      "firstPlace": _vm.firstPlace
    },
    on: {
      "updateBubbleCount": _vm.updateBubbleCount
    }
  }) : _vm._e(), _vm.showGameArea ? _c('div', {
    staticClass: "run-controls"
  }, [_c('div', {
    staticClass: "run-button-wrapper"
  }, [_c('button', {
    ref: "runButton",
    staticClass: "run-button",
    on: {
      "mousedown": _vm.runAction,
      "mouseup": _vm.runStop,
      "mouseleave": _vm.runStop,
      "touchstart": _vm.runAction,
      "touchend": _vm.runStop
    }
  }, [_c('img', {
    staticClass: "run-emoji",
    attrs: {
      "src": __webpack_require__("2a2d"),
      "alt": "Running"
    }
  })]), _c('svg', {
    staticClass: "run-button-progress",
    attrs: {
      "width": "100",
      "height": "100"
    }
  }, [_c('circle', {
    style: {
      strokeDashoffset: _vm.progressOffset
    },
    attrs: {
      "cx": "50",
      "cy": "50",
      "r": "45"
    }
  })])])]) : _vm._e()], 1), !_vm.gameStart ? _c('div', {
    staticClass: "survivorCount",
    attrs: {
      "id": "survivorCount"
    }
  }, [_vm._v(" 접속중인 인원 " + _vm._s(_vm.survivorsCount) + " 명 ")]) : _vm._e(), _vm.gameStart ? _c('div', {
    staticClass: "game_progress_status"
  }, [_c('span', {
    staticStyle: {
      "margin-right": "25px"
    }
  }, [_vm._v("my rank 🏆: " + _vm._s(_vm.currentRank) + " ")]), _c('span', {
    staticStyle: {
      "margin-right": "30px"
    }
  }, [_vm._v(" 남은 종료 시간 : " + _vm._s(_vm.remainingTime) + "⏳️ ")]), _c('span', [_vm._v(" " + _vm._s(_vm.bubbleCountText))])]) : _vm._e(), _vm.isAndroidDevice ? _c('div', {
    staticClass: "fullscreen-buttons"
  }, [_c('button', {
    attrs: {
      "id": "fullscreen-toggle"
    },
    on: {
      "click": _vm.toggleFullscreen
    }
  }, [_vm._v("전체 화면 켜기")])]) : _vm._e()]), _vm.host ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.gameStarted,
      expression: "!gameStarted"
    }],
    staticClass: "host-controls"
  }, [_c('button', {
    class: ['start-game-button', {
      animated: _vm.animateButton
    }],
    on: {
      "click": _vm.attemptStartGame
    }
  }, [_vm._v("Start")])]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.gameStart,
      expression: "gameStart"
    }],
    staticClass: "updatedRank"
  }, [_vm._v(" " + _vm._s(_vm.Currently1stPlace) + " ")]), _vm.showModal ? _c('custom-modal', {
    attrs: {
      "message": _vm.modalMessage
    },
    on: {
      "confirm": _vm.startGame,
      "cancel": _vm.cancelStartGame
    }
  }) : _vm._e(), _vm.showGameArea ? _c('div', {
    ref: "joystick",
    staticClass: "joystick"
  }, [_c('div', {
    ref: "joystickBase",
    staticClass: "joystick-base"
  }, [_c('div', {
    ref: "joystickStick",
    staticClass: "joystick-stick"
  }, [_c('span', {
    staticClass: "joystick-emoji"
  }, [_vm._v(_vm._s(_vm.myEmoji))])])])]) : _vm._e(), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다! ")]), _vm.gameInstructions ? _c('div', {
    staticClass: "game-instructions"
  }, [_c('div', {
    staticClass: "game-instructions-content"
  }, [_c('p', [_vm._v(_vm._s(_vm.gameInstructions))])])]) : _vm._e()], 1) : _vm._e(), _vm.gameEnd ? _c('WinnerModal', {
    attrs: {
      "winner": _vm.firstPlace,
      "sortedParticipants": _vm.allParticipants
    },
    on: {
      "close": _vm.returnToMain
    }
  }) : _vm._e()], 1);
};
var ClientViewvue_type_template_id_01f764ae_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=template&id=01f764ae&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=template&id=aac92d7a&scoped=true
var MainScreenvue_type_template_id_aac92d7a_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "MainScreen",
    attrs: {
      "id": "main-screen"
    }
  }, [_c('h3', {
    attrs: {
      "id": "numOfsurvivors"
    }
  }, [_vm._v(_vm._s(_vm.survivorsCount))]), _c('audio', {
    ref: "buttonSound",
    attrs: {
      "src": __webpack_require__("89f0"),
      "preload": "auto"
    }
  }), _c('button', {
    staticClass: "enter-button",
    attrs: {
      "disabled": _vm.gameStarted
    },
    on: {
      "click": _vm.handleEnterGame
    }
  }, [_vm._v(" " + _vm._s(_vm.gameStateTxt))]), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다 ! ")])]);
};
var MainScreenvue_type_template_id_aac92d7a_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=template&id=aac92d7a&scoped=true

// EXTERNAL MODULE: ./node_modules/socket.io-client/build/esm/index.js + 16 modules
var esm = __webpack_require__("daa8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=script&lang=js

const socket = Object(esm["a" /* default */])();
/* harmony default export */ var MainScreenvue_type_script_lang_js = ({
  data() {
    return {
      survivorsCount: '',
      gameStateTxt: '게임 입장하기',
      gameStarted: false
    };
  },
  mounted() {
    socket.emit('checkGameStatus');
    socket.on('gameAlreadyStarted', () => {
      this.gameStateTxt = '게임 진행중';
      this.gameStarted = true; //게임 입장하기 버튼 비활
    });
    socket.on('gameNotStarted', () => {
      this.gameStateTxt = '게임 입장하기';
      this.gameStarted = false;
    });
    socket.on('gameEnd', () => {
      this.gameStateTxt = '게임 입장하기';
      this.gameStarted = false;
    });
  },
  methods: {
    playButtonSound() {
      const audio = this.$refs.buttonSound;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    },
    handleEnterGame() {
      this.playButtonSound(); // 버튼 클릭 시 사운드 재생
      setTimeout(() => {
        if (!this.gameStarted) {
          this.$emit('enter-game');
        }
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=script&lang=js
 /* harmony default export */ var components_MainScreenvue_type_script_lang_js = (MainScreenvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/MainScreen.vue?vue&type=style&index=0&id=aac92d7a&prod&scoped=true&lang=css
var MainScreenvue_type_style_index_0_id_aac92d7a_prod_scoped_true_lang_css = __webpack_require__("1787");

// CONCATENATED MODULE: ./src/components/MainScreen.vue






/* normalize component */

var MainScreen_component = Object(componentNormalizer["a" /* default */])(
  components_MainScreenvue_type_script_lang_js,
  MainScreenvue_type_template_id_aac92d7a_scoped_true_render,
  MainScreenvue_type_template_id_aac92d7a_scoped_true_staticRenderFns,
  false,
  null,
  "aac92d7a",
  null
  
)

/* harmony default export */ var MainScreen = (MainScreen_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=template&id=99fd4c78&scoped=true
var GameAreavue_type_template_id_99fd4c78_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "board"
  }, [_c('audio', {
    ref: "backgroundMusic",
    attrs: {
      "loop": ""
    }
  }, [_c('source', {
    attrs: {
      "src": __webpack_require__("e15b"),
      "type": "audio/mpeg"
    }
  }), _vm._v(" Your browser does not support the audio element. ")]), _c('audio', {
    ref: "bubbleSound",
    attrs: {
      "preload": "auto"
    }
  }, [_c('source', {
    attrs: {
      "src": __webpack_require__("7651"),
      "type": "audio/mpeg"
    }
  })]), _c('img', {
    staticClass: "console-img",
    attrs: {
      "src": __webpack_require__("e5f5"),
      "alt": "Console Background"
    }
  }), _c('div', {
    attrs: {
      "id": "game-area"
    }
  }, [_vm._l(_vm.participants, function (participant) {
    return _c('div', {
      key: participant.id,
      ref: "gameArea",
      refInFor: true,
      staticClass: "participant",
      style: {
        left: participant.x + 'px',
        top: participant.y + 'px'
      }
    }, [_vm.firstPlace && participant.id === _vm.firstPlace.id ? _c('span', {
      staticClass: "crown"
    }, [_vm._v("👑")]) : _vm._e(), _vm._v(" " + _vm._s(participant.emoji) + " ")]);
  }), _vm._l(_vm.bubbles, function (bubble) {
    return _c('div', {
      key: bubble.id,
      staticClass: "bubble",
      style: {
        left: bubble.x + 'px',
        top: bubble.y + 'px',
        animationDelay: bubble.delay + 's'
      }
    });
  })], 2)])]);
};
var GameAreavue_type_template_id_99fd4c78_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=template&id=99fd4c78&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=script&lang=js

var GameAreavue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var GameAreavue_type_script_lang_js = ({
  props: {
    participants: Array,
    // 참가자 목록
    firstPlace: Object
  },
  data() {
    return {
      bubbles: [],
      // 생성된 버블을 담을 배열   
      bubbleCount: 0,
      isPlaying: false
    };
  },
  mounted() {
    // 게임 지침이 끝난 후 버블 생성 시작
    GameAreavue_type_script_lang_js_socket.on('gameInstructions', data => {
      if (data == '') {
        setTimeout(() => this.startBubbleGeneration(), 1000);
      }
    });
    this.detectCollisions(); // 충돌 감지 시작
  },
  methods: {
    // 배경 음악 토글
    toggleMusic() {
      const audio = this.$refs.backgroundMusic;
      if (this.isPlaying) {
        audio.pause();
      } else {
        // 사용자의 인터랙션 이후에 오디오를 재생
        audio.play().catch(error => {
          console.error('재생 오류:', error);
        });
      }
      this.isPlaying = !this.isPlaying;
    },
    // 버블 생성
    startBubbleGeneration() {
      setInterval(() => {
        if (this.bubbles.length >= 20) {
          this.bubbles.shift(); // 오래된 버블 제거
        }
        const bubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * (window.innerWidth * 0.9),
          // 게임 영역 너비의 90%
          y: Math.random() * (window.innerHeight * 0.7),
          // 게임 영역 높이의 70%
          delay: Math.random() * 2
        };
        this.bubbles.push(bubble);
      }, 1000); // 버블 생성 간격
    },
    // 충돌 감지
    detectCollisions() {
      setInterval(() => {
        this.bubbles.forEach((bubble, bubbleIndex) => {
          this.participants.forEach(participant => {
            const dx = bubble.x - participant.x;
            const dy = bubble.y - participant.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 45) {
              // 버블과 참가자의 반지름을 더한 값보다 작으면 충돌
              this.bubbles.splice(bubbleIndex, 1); // 버블 제거
              this.bubbleCount++; // 터진 버블 카운트를 증가시킴
              this.$emit('updateBubbleCount', this.bubbleCount); // 이벤트 emit
              console.log(`현재 터트린 버블갯수!! : ${this.bubbleCount}`);
              if (this.$refs.bubbleSound) {
                this.$refs.bubbleSound.play().catch(error => {
                  console.error('오디오 재생 오류:', error);
                });
              }
            }
          });
        });
      }, 50); // 50ms마다 충돌 감지
    }
  }
});
// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=script&lang=js
 /* harmony default export */ var components_GameAreavue_type_script_lang_js = (GameAreavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/GameArea.vue?vue&type=style&index=0&id=99fd4c78&prod&scoped=true&lang=css
var GameAreavue_type_style_index_0_id_99fd4c78_prod_scoped_true_lang_css = __webpack_require__("6a50");

// CONCATENATED MODULE: ./src/components/GameArea.vue






/* normalize component */

var GameArea_component = Object(componentNormalizer["a" /* default */])(
  components_GameAreavue_type_script_lang_js,
  GameAreavue_type_template_id_99fd4c78_scoped_true_render,
  GameAreavue_type_template_id_99fd4c78_scoped_true_staticRenderFns,
  false,
  null,
  "99fd4c78",
  null
  
)

/* harmony default export */ var GameArea = (GameArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WinnerModal.vue?vue&type=template&id=478443ae&scoped=true
var WinnerModalvue_type_template_id_478443ae_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "winner-modal"
  }, [_c('div', {
    staticClass: "winner-modal-content"
  }, [_c('span', {
    staticClass: "close",
    on: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }, [_vm._v("×")]), _c('h2', [_vm._v("우승자 발표 🎉")]), _c('div', {
    staticClass: "winner-announcement"
  }, [_c('p', [_vm._v(_vm._s(_vm.winner.emoji) + " (" + _vm._s(_vm.winner.id) + ")가 " + _vm._s(_vm.winner.bCount) + "개의 버블을 터트렸습니다!")])]), _c('div', {
    staticClass: "all-rankings"
  }, [_c('h3', [_vm._v("전체 참가자 랭킹")]), _c('ul', _vm._l(_vm.sortedParticipants, function (participant, index) {
    return _c('li', {
      key: participant.id,
      staticClass: "ranking-item"
    }, [_vm._v(" " + _vm._s(index + 1) + "등: " + _vm._s(participant.emoji) + " (" + _vm._s(participant.id) + ") - " + _vm._s(participant.bCount) + "개 ")]);
  }), 0)])])]);
};
var WinnerModalvue_type_template_id_478443ae_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/WinnerModal.vue?vue&type=template&id=478443ae&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WinnerModal.vue?vue&type=script&lang=js
/* harmony default export */ var WinnerModalvue_type_script_lang_js = ({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Object,
      default: () => ({})
    },
    sortedParticipants: {
      type: Array,
      default: () => []
    },
    myRank: {
      type: Number,
      default: 0
    },
    myBubbleCount: {
      type: Number,
      default: 0
    }
  }
});
// CONCATENATED MODULE: ./src/components/WinnerModal.vue?vue&type=script&lang=js
 /* harmony default export */ var components_WinnerModalvue_type_script_lang_js = (WinnerModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/WinnerModal.vue?vue&type=style&index=0&id=478443ae&prod&scoped=true&lang=css
var WinnerModalvue_type_style_index_0_id_478443ae_prod_scoped_true_lang_css = __webpack_require__("2086");

// CONCATENATED MODULE: ./src/components/WinnerModal.vue






/* normalize component */

var WinnerModal_component = Object(componentNormalizer["a" /* default */])(
  components_WinnerModalvue_type_script_lang_js,
  WinnerModalvue_type_template_id_478443ae_scoped_true_render,
  WinnerModalvue_type_template_id_478443ae_scoped_true_staticRenderFns,
  false,
  null,
  "478443ae",
  null
  
)

/* harmony default export */ var WinnerModal = (WinnerModal_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomModal.vue?vue&type=template&id=385e497a
var CustomModalvue_type_template_id_385e497a_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal-overlay"
  }, [_c('div', {
    staticClass: "modal"
  }, [_c('audio', {
    ref: "buttonSound",
    attrs: {
      "src": __webpack_require__("89f0"),
      "preload": "auto"
    }
  }), _c('p', {
    staticClass: "modal-message"
  }, [_vm._v(_vm._s(_vm.message))]), _c('div', {
    staticClass: "modal-buttons"
  }, [_c('button', {
    staticClass: "modal-button confirm",
    on: {
      "click": function ($event) {
        return _vm.handleAction('confirm');
      }
    }
  }, [_vm._v("확인")]), _c('button', {
    staticClass: "modal-button cancel",
    on: {
      "click": function ($event) {
        return _vm.handleAction('cancel');
      }
    }
  }, [_vm._v("취소")])])])]);
};
var CustomModalvue_type_template_id_385e497a_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/CustomModal.vue?vue&type=template&id=385e497a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomModal.vue?vue&type=script&lang=js
/* harmony default export */ var CustomModalvue_type_script_lang_js = ({
  props: ['message'],
  methods: {
    playButtonSound() {
      const audio = this.$refs.buttonSound;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Audio play error:', error);
        });
      }
    },
    handleAction(action) {
      this.playButtonSound();
      setTimeout(() => {
        if (action === 'confirm') {
          this.$emit('confirm');
        } else if (action === 'cancel') {
          this.$emit('cancel');
        }
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/CustomModal.vue?vue&type=script&lang=js
 /* harmony default export */ var components_CustomModalvue_type_script_lang_js = (CustomModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/CustomModal.vue?vue&type=style&index=0&id=385e497a&prod&lang=css
var CustomModalvue_type_style_index_0_id_385e497a_prod_lang_css = __webpack_require__("2649");

// CONCATENATED MODULE: ./src/components/CustomModal.vue






/* normalize component */

var CustomModal_component = Object(componentNormalizer["a" /* default */])(
  components_CustomModalvue_type_script_lang_js,
  CustomModalvue_type_template_id_385e497a_render,
  CustomModalvue_type_template_id_385e497a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CustomModal = (CustomModal_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=script&lang=js





var ClientViewvue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ClientViewvue_type_script_lang_js = ({
  components: {
    MainScreen: MainScreen,
    GameArea: GameArea,
    WinnerModal: WinnerModal,
    CustomModal: CustomModal
  },
  data() {
    return {
      participants: [],
      // 게임 내 참가자 목록
      showMyCharacter: false,
      // 내 캐릭터 표시 여부
      myEmoji: '',
      // 내 이모지
      showGameArea: false,
      // 게임 영역 표시 여부
      survivorsCount: 0,
      // 접속 중인 인원
      bubbleCountText: '터트린 🫧 갯수 : 0',
      currentPosition: '',
      // 현재 위치
      moveInterval: null,
      gameInstructions: '',
      // 게임 설명 text
      gameStart: false,
      // 게임 시작 여부 
      timerInterval: null,
      gameEnd: false,
      // 게임 종료 여부
      remainingTime: '',
      // 남은 종료 시간 표시
      isRun: false,
      // 달리기 여부
      gameEndSent: false,
      currentRank: '',
      // 현재 나의 랭크
      firstPlace: {},
      // 1등 참가자
      allParticipants: [],
      // 모든 참가자 목록
      isAndroidDevice: false,
      // os확인
      joystickStartX: 0,
      // 조이스틱 시작 X 좌표 
      joystickStartY: 0,
      // 조이스틱 시작 X 좌표 
      joystickMoveX: 0,
      // 조이스틱 이동 X 좌표
      joystickMoveY: 0,
      // 조이스틱 이동 Y 좌표
      joystickMoveInterval: null,
      isHost: '',
      // 호스트 여부
      host: false,
      // 호스트 여부
      gameStarted: false,
      // 게임 시작 여부
      showModal: false,
      // 게임시작 확인 팝업
      modalMessage: '',
      // 게임시작 팝업 메세지
      animateButton: false,
      // 버튼 애니메이션
      runProgress: 100,
      // 달리기 진행도
      runInterval: null,
      // 달리기 인터벌
      fillInterval: null,
      // 채우기 인터벌
      Currently1stPlace: ''
    };
  },
  computed: {
    // 달리기 진행도 오프셋 계산
    progressOffset() {
      const circumference = 2 * Math.PI * 45;
      return circumference * (1 - this.runProgress / 100);
    }
  },
  watch: {
    // 접속자 수 변화 감지
    survivorsCount(newValue, oldValue) {
      if (newValue > oldValue) {
        this.animateButton = true;
        setTimeout(() => {
          this.animateButton = false;
        }, 1000);
      }
    }
  },
  methods: {
    // 효과음 재생
    playButtonSound() {
      const audio = this.$refs.buttonSound;
      if (audio) {
        audio.currentTime = 0; // 사운드를 처음부터 재생
        audio.play().catch(error => {
          console.error('Audio play error:', error);
        });
      }
    },
    attemptStartGame() {
      this.playButtonSound();
      setTimeout(() => {
        this.modalMessage = `${this.survivorsCount}명으로 게임을 시작하시겠습니까? (게임 시작 이후 종료가 불가능합니다.)`;
        this.showModal = true;
      }, 1000);
    },
    // 게임 시작 확인 팝업 버튼 확인 클릭시
    startGame() {
      this.showModal = false;
      this.gameStarted = true;
      ClientViewvue_type_script_lang_js_socket.emit('startGame'); // 게임시작 전송
    },
    // 게임 시작 확인 팝업 취소 버튼 클릭시
    cancelStartGame() {
      this.showModal = false;
    },
    // 게임 종료 이후 새로고침
    returnToMain() {
      window.location.reload();
    },
    // 게임 입장
    enterGame() {
      document.getElementById('main-screen').style.display = 'none'; //main screen hide
      this.showGameArea = true;
      this.showMyCharacter = true;
      this.showNumOfSurvivors = false;
      this.$refs.waitingMusic.play(); //음악 play

      this.$nextTick(() => {
        var gameAreaSize = document.getElementById('game-area').getBoundingClientRect();
        this.gameAreaHeight = gameAreaSize.height - 48;
        this.gameAreaWidth = gameAreaSize.width - 48;
        var areaSize = {
          top: gameAreaSize.height,
          right: gameAreaSize.width
        };
        //서버에게 해당 참가자의 게임영역 전송
        ClientViewvue_type_script_lang_js_socket.emit('newParticipant', {
          emoji: '',
          gameAreaSize: areaSize
        });
        if (this.$refs.joystick) {
          this.initJoystick();
        }
      });
    },
    // 해당 참가자의 이동이 일어났을때
    move(deltaX, deltaY) {
      let currentUser = this.participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        currentUser.x += deltaX;
        currentUser.y += deltaY;

        // 경계 체크
        if (currentUser.x < 0) currentUser.x = 0;
        if (currentUser.x > this.gameAreaWidth) currentUser.x = this.gameAreaWidth;
        if (currentUser.y < 0) currentUser.y = 0;
        if (currentUser.y > this.gameAreaHeight) currentUser.y = this.gameAreaHeight;
        //업데이트 된 위치 서버로 전달  
        ClientViewvue_type_script_lang_js_socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition(); //해당 참가자의 위치 update
      }
    },
    //해당 참가자가 달리기 버튼을 클릭 시
    runAction() {
      //잔여 run이 있을때만
      if (this.runProgress > 0) {
        this.isRun = true;
        this.$refs.runButton.classList.add('active');
        this.runInterval = setInterval(() => {
          if (this.runProgress > 0) {
            this.runProgress -= 3;
          } else {
            this.runStop(); // 이동 중지
          }
        }, 30);
      }
    },
    // 이동 중지
    runStop() {
      this.isRun = false;
      this.$refs.runButton.classList.remove('active');
      clearInterval(this.runInterval);
    },
    // run 채우기
    startFilling() {
      this.fillInterval = setInterval(() => {
        //현재 달리는 중이 아니고 잔여 process가 full fill이 아닐때만
        if (this.runProgress < 100 && !this.isRun) {
          this.runProgress += 0.5;
        }
      }, 100);
    },
    // 해당 참가자의 위치 update 
    updateCurrentPosition() {
      const currentUser = this.participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.currentPosition = `X: ${currentUser.x.toFixed(1)}, Y: ${currentUser.y.toFixed(1)}`;
      }
    },
    // 해당 참가자의 bubble count 업데이트
    updateBubbleCount(count) {
      this.bubbleCountText = '터트린 🫧 갯수: ' + count;
      // update된 버블 count를 서버에 전달
      ClientViewvue_type_script_lang_js_socket.emit('bubbleBuster', {
        id: ClientViewvue_type_script_lang_js_socket.id,
        emoji: this.myEmoji,
        bCount: count
      });
    },
    // 게임 설명 뒤 타이머 시작 
    startTimer() {
      this.remainingTime = 30;
      this.gameEndSent = false;
      this.timerInterval = setInterval(() => {
        this.remainingTime--; //1초씩 차감
        if (this.remainingTime <= 0 && !this.gameEndSent) {
          clearInterval(this.timerInterval);
          this.gameEndSent = true; // 게임 종료 상태를 true로
        }
      }, 1000);
    },
    // full screen (adroid) toggle
    toggleFullscreen() {
      const elem = document.documentElement;
      const toggleButton = document.getElementById('fullscreen-toggle');
      //full screen 일때
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          // Safari
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          // IE11
          elem.msRequestFullscreen();
        }
        toggleButton.textContent = '전체 화면 끄기';
        //full screen이 아닐때
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          // Safari
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE11
          document.msExitFullscreen();
        }
        toggleButton.textContent = '전체 화면 켜기';
      }
    },
    // 안드로이드 기기 여부 확인
    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },
    // 조이스틱 초기화
    initJoystick() {
      const joystickBase = this.$refs.joystickBase;
      const joystickStick = this.$refs.joystickStick;
      joystickStick.addEventListener('touchstart', this.startJoystick);
      joystickStick.addEventListener('touchmove', this.moveJoystick);
      joystickStick.addEventListener('touchend', this.endJoystick);
    },
    // 조이스틱 시작
    startJoystick(event) {
      const touch = event.touches[0];
      this.joystickStartX = touch.clientX;
      this.joystickStartY = touch.clientY;
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.joystickMoveInterval = setInterval(this.updateMovement, 30);
      this.$refs.joystickBase.classList.add('active');
    },
    // 조이스틱 이동
    moveJoystick(event) {
      event.preventDefault(); // 터치 이동 중 스크롤 방지
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.joystickStartX;
      const deltaY = touch.clientY - this.joystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 50; // 조이스틱 최대 이동 거리

      let moveX = deltaX;
      let moveY = deltaY;
      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        moveX = Math.cos(angle) * maxDistance;
        moveY = Math.sin(angle) * maxDistance;
      }
      this.joystickMoveX = moveX / maxDistance;
      this.joystickMoveY = moveY / maxDistance;
      if (this.$refs.joystickStick) {
        this.$refs.joystickStick.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    },
    // 조이스틱 종료
    endJoystick(event) {
      event.preventDefault(); // 터치 종료 중 스크롤 방지
      this.$refs.joystickStick.style.transform = 'translate(0, 0)';
      clearInterval(this.joystickMoveInterval);
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.triggerHapticFeedback();
      this.$refs.joystickBase.classList.remove('active');
    },
    //  이동 update
    updateMovement() {
      const moveDistance = this.isRun ? 10 : 4; // 이동 속도 조절
      const deltaX = this.joystickMoveX * moveDistance;
      const deltaY = this.joystickMoveY * moveDistance;
      this.move(deltaX, deltaY);
    },
    // 조이스틱 종료 이후 진동
    triggerHapticFeedback() {
      // adnroid
      if (navigator.vibrate) {
        navigator.vibrate(10);
      } else {
        // ios
        this.addVisualFeedback();
      }
    },
    // ios 진동
    addVisualFeedback() {
      const joystickStick = this.$refs.joystickStick;
      joystickStick.classList.add('shake');
      setTimeout(() => {
        joystickStick.classList.remove('shake');
      }, 100);
    }
  },
  mounted() {
    this.isAndroidDevice = this.isAndroid(); // 안드로이드 기기 여부 확인
    this.startFilling(); // run fill

    // 서버로부터 현재 참가자들의 인원수를 전달 받는다.
    ClientViewvue_type_script_lang_js_socket.on('currentclientCount', clientCount => {
      this.survivorsCount = clientCount;
    });
    // 업데이트 된 참가자 정보
    ClientViewvue_type_script_lang_js_socket.on('updateParticipants', participants => {
      this.participants = participants;
      this.survivorsCount = participants.length;
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        this.isHost = currentUser.isHost ? '👑방장👑' : '👔참가자👔';
        if (currentUser.isHost) {
          this.host = true;
        }
      }
    });
    // 서버로부터 전달받은 참가자의 위치 정보 업데이트
    ClientViewvue_type_script_lang_js_socket.on('positionUpdate', data => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        this.updateCurrentPosition();
      }
    });
    // 방장의 start 신호 이후 게임 설명
    ClientViewvue_type_script_lang_js_socket.on('gameInstructions', data => {
      this.gameInstructions = data; // 게임 지침 설명 text
      if (data == '') {
        this.gameStart = true;
        this.runProgress = 100; // run fill
        this.startTimer(); // count 시작
      }
    });
    // 참가자들의 bubble count로 순위 업데이트
    ClientViewvue_type_script_lang_js_socket.on('rankUpdate', data => {
      this.currentRank = data.rank;
      this.firstPlace = data.firstPlace;
      this.allParticipants = data.allParticipants;
      this.Currently1stPlace = `현재 1등 참가자는 ${data.firstPlace.emoji}이며, 터트린 갯수는 ${data.firstPlace.bCount}개 입니다.`;
    });
    // 게임 종료 신호
    ClientViewvue_type_script_lang_js_socket.on('showRank', data => {
      this.gameEnd = true;
      this.firstPlace = data.whoFianlWinner;
      this.allParticipants = data.resultRank; // 전체 참가자의 게임 정보
    });
  }
});
// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ClientViewvue_type_script_lang_js = (ClientViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ClientView.vue?vue&type=style&index=0&id=01f764ae&prod&scoped=true&lang=css
var ClientViewvue_type_style_index_0_id_01f764ae_prod_scoped_true_lang_css = __webpack_require__("29e6");

// CONCATENATED MODULE: ./src/views/ClientView.vue






/* normalize component */

var ClientView_component = Object(componentNormalizer["a" /* default */])(
  views_ClientViewvue_type_script_lang_js,
  ClientViewvue_type_template_id_01f764ae_scoped_true_render,
  ClientViewvue_type_template_id_01f764ae_scoped_true_staticRenderFns,
  false,
  null,
  "01f764ae",
  null
  
)

/* harmony default export */ var ClientView = (ClientView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1d86e607-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=template&id=7a9a1fd5&scoped=true
var ServerViewvue_type_template_id_7a9a1fd5_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "container",
    attrs: {
      "id": "host-info"
    }
  }, [_c('div', {
    staticClass: "dashboard-section"
  }, [_vm.isWaiting ? _c('div', [_c('h2', {
    staticClass: "title"
  }, [_vm._v("접속자🦰")]), _c('h3', {
    staticClass: "participant-num"
  }, [_vm._v(_vm._s(_vm.survivorsCountText))]), _c('div', {
    staticClass: "participant-list"
  }, [_vm.participantInfos.length == 0 ? _c('div', {
    staticClass: "noParticipant"
  }, [_c('img', {
    staticClass: "cute-fish no-participant-fish",
    attrs: {
      "src": __webpack_require__("c0d6"),
      "alt": "Cute Tropical Fish"
    }
  }), _c('h2', {
    staticClass: "noParti"
  }, [_vm._v("접속중인 참가자가 없어요.🫨")])]) : _vm._e(), _vm._l(_vm.participantInfos, function (info) {
    return _c('div', {
      key: info.id,
      staticClass: "participant-info"
    }, [_vm._v(" " + _vm._s(info.emoji) + " " + _vm._s(info.id) + " ")]);
  })], 2)]) : _vm._e(), !_vm.isWaiting ? _c('div', [_c('h1', {
    staticClass: "title"
  }, [_vm._v("record🏆")]), _c('div', {
    staticClass: "participant-list"
  }, _vm._l(_vm.sortedParticipantInfos, function (info, index) {
    return _c('div', {
      key: info.id,
      class: ['rank-info', _vm.rankClass(index)]
    }, [info.bCount ? _c('div', [_vm._v(" " + _vm._s(index + 1) + "등: " + _vm._s(info.emoji) + " " + _vm._s(info.id) + " 가 " + _vm._s(info.bCount) + "개! ")]) : _vm._e()]);
  }), 0)]) : _vm._e()]), _vm.isWaiting ? _c('div', [_c('button', {
    staticClass: "start-game",
    on: {
      "click": _vm.startGame
    }
  }, [_vm._v(_vm._s(_vm.clickState))])]) : _vm._e(), !_vm.isWaiting ? _c('div', {
    staticClass: "survivorCount"
  }, [_vm._v("남은 종료 시간 : " + _vm._s(_vm.remainingTime) + " ")]) : _vm._e(), _c('WinnerModal', {
    attrs: {
      "visible": _vm.showWinnerModal,
      "winner": _vm.winner
    },
    on: {
      "close": function ($event) {
        _vm.showWinnerModal = false;
      }
    }
  })], 1);
};
var ServerViewvue_type_template_id_7a9a1fd5_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=template&id=7a9a1fd5&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=script&lang=js

var ServerViewvue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ServerViewvue_type_script_lang_js = ({
  data() {
    return {
      participantInfos: [],
      survivorsCountText: '접속인원 0명',
      isWaiting: true,
      timerInterval: null,
      remainingTime: 0,
      showWinnerModal: false,
      winner: null,
      clickState: 'start 🏃‍♀️'
    };
  },
  computed: {
    sortedParticipantInfos() {
      return [...this.participantInfos].sort((a, b) => b.bCount - a.bCount);
    }
  },
  methods: {
    startGame() {
      if (this.participantInfos.length == 0) {
        alert('접속중인 참가자가 없어요!');
      } else {
        ServerViewvue_type_script_lang_js_socket.emit('startGame');
      }
    },
    startTimer() {
      this.remainingTime = 30;
      this.isWaiting = false;
      this.timerInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
    updateBubbleCount(data) {
      const currentUserIndex = this.participantInfos.findIndex(p => p.id === data.id);
      if (currentUserIndex !== -1) {
        this.participantInfos[currentUserIndex].bCount = data.bCount;
      } else {
        this.participantInfos.push({
          id: data.id,
          emoji: data.emoji,
          bCount: data.bCount
        });
      }
      const newSortedParticipants = [...this.participantInfos].sort((a, b) => b.bCount - a.bCount);
      let rankChanged = false;
      for (let i = 0; i < newSortedParticipants.length; i++) {
        if (i >= this.sortedParticipantInfos.length || newSortedParticipants[i].id !== this.sortedParticipantInfos[i].id) {
          rankChanged = true;
          break;
        }
      }
      if (rankChanged) {
        this.participantInfos = newSortedParticipants;
        this.requestRankUpdate(this.participantInfos);
      }
    },
    requestRankUpdate(data) {
      ServerViewvue_type_script_lang_js_socket.emit('updateRanks', data); //업데이트 된 랭킹 정보
    },
    rankClass(index) {
      switch (index) {
        case 0:
          return 'first-place';
        case 1:
          return 'second-place';
        case 2:
          return 'third-place';
        default:
          return 'other-ranks';
      }
    }
  },
  mounted() {
    ServerViewvue_type_script_lang_js_socket.on('updateParticipants', participants => {
      console.log(` ${ServerViewvue_type_script_lang_js_socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participantInfos = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}명`;
      const currentUser = participants.find(p => p.id === ServerViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        console.log('Current User Emoji:', this.myEmoji);
      } else {
        console.log('Current user not found in participants.');
      }
    });
    ServerViewvue_type_script_lang_js_socket.on('gameInstructions', data => {
      if (data == '') {
        this.startTimer();
      } else {
        this.clickState = "참가자들에게 게임설명중입니다...";
      }
    });
    ServerViewvue_type_script_lang_js_socket.on('bubbleBuster', data => {
      console.log('업데이트 된 버블 카운ㅌ~!', data);
      this.updateBubbleCount(data); //해당 참가자의 socket id, emoji, bubbleCount
    });
    ServerViewvue_type_script_lang_js_socket.on('gameEnd', () => {
      var resultGame = {
        whoFianlWinner: this.sortedParticipantInfos[0],
        //우승자
        resultRank: this.sortedParticipantInfos
      };
      ServerViewvue_type_script_lang_js_socket.emit('gameResult', resultGame);
    });
  }
});
// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ServerViewvue_type_script_lang_js = (ServerViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ServerView.vue?vue&type=style&index=0&id=7a9a1fd5&prod&scoped=true&lang=css
var ServerViewvue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css = __webpack_require__("8d19");

// CONCATENATED MODULE: ./src/views/ServerView.vue






/* normalize component */

var ServerView_component = Object(componentNormalizer["a" /* default */])(
  views_ServerViewvue_type_script_lang_js,
  ServerViewvue_type_template_id_7a9a1fd5_scoped_true_render,
  ServerViewvue_type_template_id_7a9a1fd5_scoped_true_staticRenderFns,
  false,
  null,
  "7a9a1fd5",
  null
  
)

/* harmony default export */ var ServerView = (ServerView_component.exports);
// CONCATENATED MODULE: ./src/router.js




vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Client',
    component: ClientView
  }, {
    path: '/server',
    name: 'Server',
    component: ServerView
  }]
}));
// EXTERNAL MODULE: ./node_modules/vue-socket.io/dist/vue-socketio.js
var vue_socketio = __webpack_require__("5132");
var vue_socketio_default = /*#__PURE__*/__webpack_require__.n(vue_socketio);

// EXTERNAL MODULE: ./src/assets/main.css
var main = __webpack_require__("845f");

// CONCATENATED MODULE: ./src/main.js






vue_runtime_esm["a" /* default */].config.productionTip = false;
const socketConnection = Object(esm["a" /* default */])('http://localhost:4000');
vue_runtime_esm["a" /* default */].use(new vue_socketio_default.a({
  debug: true,
  connection: socketConnection
}));
vue_runtime_esm["a" /* default */].prototype.$socket = socketConnection;
new vue_runtime_esm["a" /* default */]({
  router: router,
  render: h => h(App),
  mounted() {
    // 두 번 클릭 확대 방지
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}).$mount('#app');

/***/ }),

/***/ "5f8f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6a50":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_99fd4c78_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c2fa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_99fd4c78_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_99fd4c78_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "760c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7651":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/bubble_pop.b69add8a.mp4";

/***/ }),

/***/ "845f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "89f0":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/effect.19a355e0.mp4";

/***/ }),

/***/ "8d19":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f8f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c0d6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/wait.afbadb5e.png";

/***/ }),

/***/ "c2fa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "df2f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e050":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e15b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/console.e4e0e527.mp4";

/***/ }),

/***/ "e5f5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/console.c14c380a.png";

/***/ }),

/***/ "edbe":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/waiting.ecf485ee.mp4";

/***/ }),

/***/ "fd75":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_1e87bc7e_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fecb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_1e87bc7e_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_1e87bc7e_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fecb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.4d9e6495.js.map