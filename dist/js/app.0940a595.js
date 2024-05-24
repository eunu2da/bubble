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

/***/ "05d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_77b28373_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6345");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_77b28373_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_77b28373_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0960":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1901":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_57394dbb_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cc01");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_57394dbb_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_57394dbb_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "36d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_6af8b743_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0960");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_6af8b743_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_6af8b743_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3ce3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=1e87bc7e
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=template&id=57394dbb&scoped=true
var ClientViewvue_type_template_id_57394dbb_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('MainScreen', {
    ref: "mainScreen",
    on: {
      "enter-game": _vm.enterGame
    }
  }), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "layout_container"
  }, [_vm.showBackButton ? _c('div', {
    attrs: {
      "id": "back-button"
    }
  }, [_c('div', {
    staticClass: "back-button"
  }, [_c('img', {
    staticClass: "back_button_img",
    attrs: {
      "src": "https://media-public.canva.com/G9aC0/MAFZirG9aC0/1/t.png",
      "draggable": "false",
      "alt": "Go Back"
    },
    on: {
      "click": _vm.goBack
    }
  })]), _vm.showMyCharacter ? _c('div', {
    staticClass: "myEmojiBox",
    attrs: {
      "id": "myEmoji"
    }
  }, [_c('h3', {
    staticClass: "me"
  }, [_vm._v("It's me")]), _c('span', {
    staticClass: "myCharacter"
  }, [_vm._v(_vm._s(_vm.myEmoji))])]) : _vm._e()]) : _vm._e()]), _c('div', {
    staticClass: "game_area_wrapper"
  }, [_c('div', {
    staticClass: "game_area_container"
  }, [_vm.showGameArea ? _c('GameArea', {
    ref: "gameArea",
    attrs: {
      "participants": _vm.participants
    }
  }) : _vm._e()], 1), _c('div', {
    staticClass: "survivorCount",
    attrs: {
      "id": "survivorCount"
    }
  }, [_vm._v(" " + _vm._s(_vm.survivorsCountText) + " ")]), _vm.showGameArea ? _c('div', {
    staticClass: "currentPosition",
    attrs: {
      "id": "currentPosition"
    }
  }, [_vm._v(" " + _vm._s(_vm.currentPosition) + " ")]) : _vm._e()]), _vm.showGameArea ? _c('div', {
    staticClass: "controls"
  }, [_c('div', {
    staticClass: "direction-buttons"
  }, [_c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('up');
      },
      "mouseup": _vm.stopMoving,
      "mouseleave": _vm.stopMoving,
      "touchstart": function ($event) {
        return _vm.startMoving('up');
      },
      "touchend": _vm.stopMoving
    }
  }, [_vm._v("↑")]), _c('div', [_c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('left');
      },
      "mouseup": _vm.stopMoving,
      "mouseleave": _vm.stopMoving,
      "touchstart": function ($event) {
        return _vm.startMoving('left');
      },
      "touchend": _vm.stopMoving
    }
  }, [_vm._v("←")]), _c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('down');
      },
      "mouseup": _vm.stopMoving,
      "mouseleave": _vm.stopMoving,
      "touchstart": function ($event) {
        return _vm.startMoving('down');
      },
      "touchend": _vm.stopMoving
    }
  }, [_vm._v("↓")]), _c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('right');
      },
      "mouseup": _vm.stopMoving,
      "mouseleave": _vm.stopMoving,
      "touchstart": function ($event) {
        return _vm.startMoving('right');
      },
      "touchend": _vm.stopMoving
    }
  }, [_vm._v("→")])])])]) : _vm._e(), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다! ")]), _vm.gameInstructions ? _c('div', {
    staticClass: "game-instructions"
  }, [_c('div', {
    staticClass: "game-instructions-content"
  }, [_c('p', [_vm._v(_vm._s(_vm.gameInstructions))])])]) : _vm._e()])], 1);
};
var ClientViewvue_type_template_id_57394dbb_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=template&id=57394dbb&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=template&id=e60df85a&scoped=true
var MainScreenvue_type_template_id_e60df85a_scoped_true_render = function render() {
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
  }, [_vm._v(_vm._s(_vm.survivorsCount))]), _c('button', {
    staticClass: "enter-button",
    on: {
      "click": _vm.enterGame
    }
  }, [_vm._v("Enter Game")]), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다 ! ")])]);
};
var MainScreenvue_type_template_id_e60df85a_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=template&id=e60df85a&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=script&lang=js
/* harmony default export */ var MainScreenvue_type_script_lang_js = ({
  data() {
    return {
      survivorsCount: ''
    };
  },
  methods: {
    enterGame() {
      document.getElementById('main-screen').style.display = 'none';
      this.$emit('enter-game');
    }
  }
});
// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=script&lang=js
 /* harmony default export */ var components_MainScreenvue_type_script_lang_js = (MainScreenvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/MainScreen.vue?vue&type=style&index=0&id=e60df85a&prod&scoped=true&lang=css
var MainScreenvue_type_style_index_0_id_e60df85a_prod_scoped_true_lang_css = __webpack_require__("6542");

// CONCATENATED MODULE: ./src/components/MainScreen.vue






/* normalize component */

var MainScreen_component = Object(componentNormalizer["a" /* default */])(
  components_MainScreenvue_type_script_lang_js,
  MainScreenvue_type_template_id_e60df85a_scoped_true_render,
  MainScreenvue_type_template_id_e60df85a_scoped_true_staticRenderFns,
  false,
  null,
  "e60df85a",
  null
  
)

/* harmony default export */ var MainScreen = (MainScreen_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=template&id=6af8b743&scoped=true
var GameAreavue_type_template_id_6af8b743_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "game-area"
    }
  }, _vm._l(_vm.participants, function (participant) {
    return _c('div', {
      key: participant.id,
      ref: "gameArea",
      refInFor: true,
      staticClass: "participant",
      style: {
        left: participant.x + 'px',
        top: participant.y + 'px'
      }
    }, [_vm._v(" " + _vm._s(participant.emoji) + " ")]);
  }), 0);
};
var GameAreavue_type_template_id_6af8b743_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=template&id=6af8b743&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=script&lang=js
/* harmony default export */ var GameAreavue_type_script_lang_js = ({
  props: {
    participants: Array
  }
});
// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=script&lang=js
 /* harmony default export */ var components_GameAreavue_type_script_lang_js = (GameAreavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/GameArea.vue?vue&type=style&index=0&id=6af8b743&prod&scoped=true&lang=css
var GameAreavue_type_style_index_0_id_6af8b743_prod_scoped_true_lang_css = __webpack_require__("36d6");

// CONCATENATED MODULE: ./src/components/GameArea.vue






/* normalize component */

var GameArea_component = Object(componentNormalizer["a" /* default */])(
  components_GameAreavue_type_script_lang_js,
  GameAreavue_type_template_id_6af8b743_scoped_true_render,
  GameAreavue_type_template_id_6af8b743_scoped_true_staticRenderFns,
  false,
  null,
  "6af8b743",
  null
  
)

/* harmony default export */ var GameArea = (GameArea_component.exports);
// EXTERNAL MODULE: ./node_modules/socket.io-client/build/esm/index.js + 16 modules
var esm = __webpack_require__("daa8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=script&lang=js



var socket = Object(esm["a" /* default */])();
/* harmony default export */ var ClientViewvue_type_script_lang_js = ({
  components: {
    MainScreen: MainScreen,
    GameArea: GameArea
  },
  data() {
    return {
      participants: [],
      showBackButton: false,
      showMyCharacter: false,
      myEmoji: '',
      showPlaceholder: false,
      currentSurvivorsText: '',
      showGameArea: false,
      survivorsCountText: '접속 인원: 0',
      currentPosition: '',
      moveInterval: null,
      gameInstructions: ''
    };
  },
  methods: {
    enterGame() {
      this.showGameArea = true;
      this.showBackButton = true;
      this.showMyCharacter = true;
      this.showPlaceholder = false;
      this.showNumOfSurvivors = false;
      this.$nextTick(() => {
        if (this.$refs.gameArea) {
          var gameAreaSize = this.$refs.gameArea.$el.getBoundingClientRect();
          var areaSize = {
            top: gameAreaSize.height,
            right: gameAreaSize.width
          };
          console.log('areaSize:', areaSize);
          socket.emit('newParticipant', {
            emoji: '',
            gameAreaSize: areaSize
          });
        }
      });
    },
    goBack() {
      socket.emit('goBack');
      this.showGameArea = false;
      this.showBackButton = false;
      this.showMyCharacter = false;
      this.showPlaceholder = true;
      this.showNumOfSurvivors = true;
      this.$refs.mainScreen.$el.display = 'block';
    },
    move(direction) {
      console.log(`Move ${direction}`);
      let currentUser = this.participants.find(p => p.id === socket.id);
      if (currentUser) {
        switch (direction) {
          case 'up':
            currentUser.y -= 10;
            break;
          case 'down':
            currentUser.y += 10;
            break;
          case 'left':
            currentUser.x -= 10;
            break;
          case 'right':
            currentUser.x += 10;
            break;
        }
        console.log(`나의 현재 위치는 x: ${currentUser.x}, y: ${currentUser.y}`);
        socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition();
      }
    },
    startMoving(direction) {
      this.move(direction);
      this.moveInterval = setInterval(() => {
        this.move(direction);
      }, 100);
    },
    stopMoving() {
      ``;
      clearInterval(this.moveInterval);
    },
    updateCurrentPosition() {
      const currentUser = this.participants.find(p => p.id === socket.id);
      if (currentUser) {
        this.currentPosition = `X: ${currentUser.x.toFixed(1)}, Y: ${currentUser.y.toFixed(1)}, ${currentUser.id}`;
      }
    }
  },
  mounted() {
    socket.on('connect', () => {
      console.log('소켓 연결', socket.id);
    });
    socket.on('updateParticipants', participants => {
      console.log(` ${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}`;
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        console.log('Current User Emoji:', this.myEmoji);
      } else {
        console.log('Current user not found in participants.');
      }
    });
    socket.on('positionUpdate', data => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        this.updateCurrentPosition();
      }
    });
    socket.on('gameInstructions', data => {
      console.log('게임 지침:', data);
      this.gameInstructions = data;
    });
  }
});
// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ClientViewvue_type_script_lang_js = (ClientViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ClientView.vue?vue&type=style&index=0&id=57394dbb&prod&scoped=true&lang=css
var ClientViewvue_type_style_index_0_id_57394dbb_prod_scoped_true_lang_css = __webpack_require__("1901");

// CONCATENATED MODULE: ./src/views/ClientView.vue






/* normalize component */

var ClientView_component = Object(componentNormalizer["a" /* default */])(
  views_ClientViewvue_type_script_lang_js,
  ClientViewvue_type_template_id_57394dbb_scoped_true_render,
  ClientViewvue_type_template_id_57394dbb_scoped_true_staticRenderFns,
  false,
  null,
  "57394dbb",
  null
  
)

/* harmony default export */ var ClientView = (ClientView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=template&id=77b28373&scoped=true
var ServerViewvue_type_template_id_77b28373_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "host-info"
    }
  }, [_c('div', {
    staticClass: "dashboard-section"
  }, [_c('ParticipantInfo', {
    attrs: {
      "participantInfos": _vm.participantInfos
    }
  })], 1), _c('div', {
    staticClass: "dashboard-section"
  }, [_c('div', {
    staticClass: "entranceNum-info",
    attrs: {
      "id": "participantCount"
    }
  }, [_c('button', {
    staticClass: "start-game",
    on: {
      "click": _vm.startGame
    }
  }, [_vm._v("start 🏃‍♀️")])])])]);
};
var ServerViewvue_type_template_id_77b28373_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=template&id=77b28373&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ParticipantInfo.vue?vue&type=template&id=3f241f64&scoped=true
var ParticipantInfovue_type_template_id_3f241f64_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "participant-info"
  }, [_c('h2', [_vm._v("접속자🦰")]), _c('p', [_vm._v(_vm._s(_vm.survivorsCountText))]), _vm._l(_vm.participantInfos, function (info) {
    return _c('div', {
      key: info.id
    }, [_vm._v(" " + _vm._s(info.emoji) + " " + _vm._s(info.id) + " ")]);
  })], 2);
};
var ParticipantInfovue_type_template_id_3f241f64_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/ParticipantInfo.vue?vue&type=template&id=3f241f64&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ParticipantInfo.vue?vue&type=script&lang=js

var ParticipantInfovue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ParticipantInfovue_type_script_lang_js = ({
  props: {
    participantInfos: Array,
    survivorsCountText: ''
  },
  mounted() {
    ParticipantInfovue_type_script_lang_js_socket.on('connect', () => {
      console.log('주최자가 접속하였습니다~', ParticipantInfovue_type_script_lang_js_socket.id);
    });
    ParticipantInfovue_type_script_lang_js_socket.on('updateParticipants', participants => {
      console.log(` ${ParticipantInfovue_type_script_lang_js_socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participantInfos = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}`;
    });
  }
});
// CONCATENATED MODULE: ./src/components/ParticipantInfo.vue?vue&type=script&lang=js
 /* harmony default export */ var components_ParticipantInfovue_type_script_lang_js = (ParticipantInfovue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/ParticipantInfo.vue?vue&type=style&index=0&id=3f241f64&prod&scoped=true&lang=css
var ParticipantInfovue_type_style_index_0_id_3f241f64_prod_scoped_true_lang_css = __webpack_require__("dd5f");

// CONCATENATED MODULE: ./src/components/ParticipantInfo.vue






/* normalize component */

var ParticipantInfo_component = Object(componentNormalizer["a" /* default */])(
  components_ParticipantInfovue_type_script_lang_js,
  ParticipantInfovue_type_template_id_3f241f64_scoped_true_render,
  ParticipantInfovue_type_template_id_3f241f64_scoped_true_staticRenderFns,
  false,
  null,
  "3f241f64",
  null
  
)

/* harmony default export */ var ParticipantInfo = (ParticipantInfo_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=script&lang=js


var ServerViewvue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ServerViewvue_type_script_lang_js = ({
  components: {
    ParticipantInfo: ParticipantInfo
  },
  data() {
    return {
      participantInfos: []
    };
  },
  methods: {
    startGame() {
      // 게임 시작 로직
      ServerViewvue_type_script_lang_js_socket.emit('startGame');
    }
  },
  mounted() {
    ServerViewvue_type_script_lang_js_socket.on('updateClientCount', data => {
      this.participantInfos.push({
        id: data.socketId,
        emoji: data.emoji
      });
    });
  }
});
// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ServerViewvue_type_script_lang_js = (ServerViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ServerView.vue?vue&type=style&index=0&id=77b28373&prod&scoped=true&lang=css
var ServerViewvue_type_style_index_0_id_77b28373_prod_scoped_true_lang_css = __webpack_require__("05d1");

// CONCATENATED MODULE: ./src/views/ServerView.vue






/* normalize component */

var ServerView_component = Object(componentNormalizer["a" /* default */])(
  views_ServerViewvue_type_script_lang_js,
  ServerViewvue_type_template_id_77b28373_scoped_true_render,
  ServerViewvue_type_template_id_77b28373_scoped_true_staticRenderFns,
  false,
  null,
  "77b28373",
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

/***/ "6345":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6542":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_e60df85a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3ce3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_e60df85a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_e60df85a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "845f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9684":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cc01":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dd5f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ParticipantInfo_vue_vue_type_style_index_0_id_3f241f64_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9684");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ParticipantInfo_vue_vue_type_style_index_0_id_3f241f64_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ParticipantInfo_vue_vue_type_style_index_0_id_3f241f64_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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
//# sourceMappingURL=app.0940a595.js.map