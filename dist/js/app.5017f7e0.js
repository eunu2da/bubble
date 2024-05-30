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

/***/ "09f8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "409b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_9f1eed20_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f711");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_9f1eed20_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_9f1eed20_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=template&id=66638622&scoped=true
var ClientViewvue_type_template_id_66638622_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [!_vm.gameEnd ? _c('MainScreen', {
    ref: "mainScreen",
    on: {
      "enter-game": _vm.enterGame
    }
  }) : _vm._e(), !_vm.gameEnd ? _c('div', {
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
    },
    on: {
      "click": _vm.showSocketId
    }
  }, [_c('h3', {
    staticClass: "me"
  }, [_vm._v("It's me")]), _c('span', {
    staticClass: "myCharacter"
  }, [_vm._v(_vm._s(_vm.myEmoji))])]) : _vm._e(), _vm.showGameArea ? _c('div', {
    staticClass: "currentPosition",
    attrs: {
      "id": "currentPosition"
    }
  }, [_vm._v(" " + _vm._s(_vm.currentPosition) + " ")]) : _vm._e()]) : _vm._e()]), _c('div', {
    staticClass: "game_area_wrapper"
  }, [_c('div', {
    staticClass: "game_area_container"
  }, [_vm.showGameArea ? _c('GameArea', {
    ref: "gameArea",
    attrs: {
      "participants": _vm.participants
    },
    on: {
      "updateBubbleCount": _vm.updateBubbleCount
    }
  }) : _vm._e(), _vm.showGameArea ? _c('div', {
    staticClass: "run-controls"
  }, [_c('button', {
    staticClass: "run-button",
    on: {
      "mousedown": function ($event) {
        return _vm.runAction();
      },
      "mouseup": function ($event) {
        return _vm.runStop();
      },
      "mouseleave": function ($event) {
        return _vm.runStop();
      },
      "touchstart": function ($event) {
        return _vm.runAction();
      },
      "touchend": function ($event) {
        return _vm.runStop();
      }
    }
  }, [_vm._v("run!")])]) : _vm._e()], 1), !_vm.gameStart ? _c('div', {
    staticClass: "survivorCount",
    attrs: {
      "id": "survivorCount"
    }
  }, [_vm._v(" 접속중인 인원 : " + _vm._s(_vm.survivorsCount) + " 명 ")]) : _vm._e(), _vm.gameStart ? _c('div', {
    staticClass: "game_progress_status"
  }, [_c('span', {
    staticStyle: {
      "margin-right": "60px"
    }
  }, [_vm._v("my rank 🏆 ")]), _c('span', {
    staticStyle: {
      "margin-right": "60px"
    }
  }, [_vm._v(" 남은 종료 시간 : " + _vm._s(_vm.remainingTime) + "⏳️ ")]), _c('span', [_vm._v(" " + _vm._s(_vm.bubbleCountText))])]) : _vm._e(), _c('div', {
    staticClass: "fullscreen-buttons"
  }, [_c('button', {
    attrs: {
      "id": "fullscreen-toggle"
    },
    on: {
      "click": _vm.toggleFullscreen
    }
  }, [_vm._v("전체 화면 켜기")])])]), _vm.showGameArea ? _c('div', {
    staticClass: "direct-controls"
  }, [_c('div', {
    staticClass: "direction-buttons"
  }, [_c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('up');
      },
      "mouseup": function ($event) {
        return _vm.stopMoving('up');
      },
      "mouseleave": function ($event) {
        return _vm.stopMoving('up');
      },
      "touchstart": function ($event) {
        return _vm.startMoving('up');
      },
      "touchend": function ($event) {
        return _vm.stopMoving('up');
      }
    }
  }, [_vm._v("↑")]), _c('div', [_c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('left');
      },
      "mouseup": function ($event) {
        return _vm.stopMoving('left');
      },
      "mouseleave": function ($event) {
        return _vm.stopMoving('left');
      },
      "touchstart": function ($event) {
        return _vm.startMoving('left');
      },
      "touchend": function ($event) {
        return _vm.stopMoving('left');
      }
    }
  }, [_vm._v("←")]), _c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('down');
      },
      "mouseup": function ($event) {
        return _vm.stopMoving('down');
      },
      "mouseleave": function ($event) {
        return _vm.stopMoving('down');
      },
      "touchstart": function ($event) {
        return _vm.startMoving('down');
      },
      "touchend": function ($event) {
        return _vm.stopMoving('down');
      }
    }
  }, [_vm._v("↓")]), _c('button', {
    on: {
      "mousedown": function ($event) {
        return _vm.startMoving('right');
      },
      "mouseup": function ($event) {
        return _vm.stopMoving('right');
      },
      "mouseleave": function ($event) {
        return _vm.stopMoving('right');
      },
      "touchstart": function ($event) {
        return _vm.startMoving('right');
      },
      "touchend": function ($event) {
        return _vm.stopMoving('right');
      }
    }
  }, [_vm._v("→")])])])]) : _vm._e(), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다! ")]), _vm.gameInstructions ? _c('div', {
    staticClass: "game-instructions"
  }, [_c('div', {
    staticClass: "game-instructions-content"
  }, [_c('p', [_vm._v(_vm._s(_vm.gameInstructions))])])]) : _vm._e()]) : _vm._e(), _c('WinnerModal', {
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
var ClientViewvue_type_template_id_66638622_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=template&id=66638622&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=template&id=7895b319&scoped=true
var MainScreenvue_type_template_id_7895b319_scoped_true_render = function render() {
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
    attrs: {
      "disabled": _vm.gameStarted
    },
    on: {
      "click": _vm.enterGame
    }
  }, [_vm._v(" " + _vm._s(_vm.gameStateTxt))]), _c('div', {
    attrs: {
      "id": "orientation-warning"
    }
  }, [_vm._v(" 가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다 ! ")])]);
};
var MainScreenvue_type_template_id_7895b319_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=template&id=7895b319&scoped=true

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
    enterGame() {
      if (!this.gameStarted) {
        this.$emit('enter-game');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/MainScreen.vue?vue&type=script&lang=js
 /* harmony default export */ var components_MainScreenvue_type_script_lang_js = (MainScreenvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/MainScreen.vue?vue&type=style&index=0&id=7895b319&prod&scoped=true&lang=css
var MainScreenvue_type_style_index_0_id_7895b319_prod_scoped_true_lang_css = __webpack_require__("802b");

// CONCATENATED MODULE: ./src/components/MainScreen.vue






/* normalize component */

var MainScreen_component = Object(componentNormalizer["a" /* default */])(
  components_MainScreenvue_type_script_lang_js,
  MainScreenvue_type_template_id_7895b319_scoped_true_render,
  MainScreenvue_type_template_id_7895b319_scoped_true_staticRenderFns,
  false,
  null,
  "7895b319",
  null
  
)

/* harmony default export */ var MainScreen = (MainScreen_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=template&id=0dae9410&scoped=true
var GameAreavue_type_template_id_0dae9410_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
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
    }, [_vm._v(" " + _vm._s(participant.emoji) + " ")]);
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
  })], 2);
};
var GameAreavue_type_template_id_0dae9410_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=template&id=0dae9410&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=script&lang=js

var GameAreavue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var GameAreavue_type_script_lang_js = ({
  props: {
    participants: Array
  },
  data() {
    return {
      bubbles: [],
      bubbleCount: 0
    };
  },
  mounted() {
    // 무한 버블 생성
    GameAreavue_type_script_lang_js_socket.on('gameInstructions', data => {
      if (data == '') {
        setTimeout(() => this.startBubbleGeneration(), 1000);
      }
    });
    this.detectCollisions();
  },
  methods: {
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
    detectCollisions() {
      setInterval(() => {
        this.bubbles.forEach((bubble, bubbleIndex) => {
          this.participants.forEach(participant => {
            const dx = bubble.x - participant.x;
            const dy = bubble.y - participant.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 45) {
              // 버블과 참가자의 반지름을 더한 값보다 작으면 충돌
              this.bubbles.splice(bubbleIndex, 1);
              this.bubbleCount++; // 터진 버블 카운트를 증가시킴
              this.$emit('updateBubbleCount', this.bubbleCount); // 이벤트 emit
              console.log(`현재 터트린 버블갯수!! : ${this.bubbleCount}`);
            }
          });
        });
      }, 50); // 50ms마다 충돌 감지
    }
  }
});
// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=script&lang=js
 /* harmony default export */ var components_GameAreavue_type_script_lang_js = (GameAreavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/GameArea.vue?vue&type=style&index=0&id=0dae9410&prod&scoped=true&lang=css
var GameAreavue_type_style_index_0_id_0dae9410_prod_scoped_true_lang_css = __webpack_require__("a979");

// CONCATENATED MODULE: ./src/components/GameArea.vue






/* normalize component */

var GameArea_component = Object(componentNormalizer["a" /* default */])(
  components_GameAreavue_type_script_lang_js,
  GameAreavue_type_template_id_0dae9410_scoped_true_render,
  GameAreavue_type_template_id_0dae9410_scoped_true_staticRenderFns,
  false,
  null,
  "0dae9410",
  null
  
)

/* harmony default export */ var GameArea = (GameArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WinnerModal.vue?vue&type=template&id=0f26498a&scoped=true
var WinnerModalvue_type_template_id_0f26498a_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.visible ? _c('div', {
    staticClass: "modal"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('span', {
    staticClass: "close",
    on: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }, [_vm._v("×")]), _c('h2', [_vm._v("우승자 발표 🎉")]), _c('p', [_vm._v(_vm._s(_vm.winner.emoji) + " (" + _vm._s(_vm.winner.id) + ")가 " + _vm._s(_vm.winner.bCount) + "개의 버블을 터트렸습니다!")])])]) : _vm._e();
};
var WinnerModalvue_type_template_id_0f26498a_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/WinnerModal.vue?vue&type=template&id=0f26498a&scoped=true

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
    }
  }
});
// CONCATENATED MODULE: ./src/components/WinnerModal.vue?vue&type=script&lang=js
 /* harmony default export */ var components_WinnerModalvue_type_script_lang_js = (WinnerModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/WinnerModal.vue?vue&type=style&index=0&id=0f26498a&prod&scoped=true&lang=css
var WinnerModalvue_type_style_index_0_id_0f26498a_prod_scoped_true_lang_css = __webpack_require__("d339");

// CONCATENATED MODULE: ./src/components/WinnerModal.vue






/* normalize component */

var WinnerModal_component = Object(componentNormalizer["a" /* default */])(
  components_WinnerModalvue_type_script_lang_js,
  WinnerModalvue_type_template_id_0f26498a_scoped_true_render,
  WinnerModalvue_type_template_id_0f26498a_scoped_true_staticRenderFns,
  false,
  null,
  "0f26498a",
  null
  
)

/* harmony default export */ var WinnerModal = (WinnerModal_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=script&lang=js




var ClientViewvue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ClientViewvue_type_script_lang_js = ({
  components: {
    MainScreen: MainScreen,
    GameArea: GameArea,
    WinnerModal: WinnerModal
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
      survivorsCount: 0,
      bubbleCountText: '터트린 🫧 갯수 : 0',
      currentPosition: '',
      moveInterval: null,
      gameInstructions: '',
      gameStart: false,
      timerInterval: null,
      gameEnd: false,
      showWinnerModal: false,
      remainingTime: '',
      isDescribing: false,
      isRun: false,
      direction: null,
      gameEndSent: false
    };
  },
  methods: {
    enterGame() {
      document.getElementById('main-screen').style.display = 'none';
      this.showGameArea = true;
      this.showBackButton = true;
      this.showMyCharacter = true;
      this.showPlaceholder = false;
      this.showNumOfSurvivors = false;
      this.$nextTick(() => {
        if (this.$refs.gameArea) {
          var gameAreaSize = this.$refs.gameArea.$el.getBoundingClientRect();
          this.gameAreaHeight = gameAreaSize.height;
          this.gameAreaWidth = gameAreaSize.width;
          var areaSize = {
            top: gameAreaSize.height,
            right: gameAreaSize.width
          };
          console.log('areaSize:', areaSize);
          ClientViewvue_type_script_lang_js_socket.emit('newParticipant', {
            emoji: '',
            gameAreaSize: areaSize
          });
        }
      });
    },
    goBack() {
      switch (true) {
        case this.isDescribing == true:
          alert('지금은 게임 설명중이에요.');
          break;
        case this.remainingTime > 0:
          if (confirm('현재 게임중이에요. 그래도 나가시겠습니까?')) {
            ClientViewvue_type_script_lang_js_socket.emit('goBack');
            this.showGameArea = false;
            this.showBackButton = false;
            this.showMyCharacter = false;
            this.showPlaceholder = true;
            this.showNumOfSurvivors = true;
            document.getElementById('main-screen').style.display = 'block';
          }
          break;
        case this.remainingTime == 0:
          if (confirm('뒤로 나가면 소켓연결이 끊어집니다. 그래도 나가시겠습니까?')) {
            ClientViewvue_type_script_lang_js_socket.emit('goBack');
            this.showGameArea = false;
            this.showBackButton = false;
            this.showMyCharacter = false;
            this.showPlaceholder = true;
            this.showNumOfSurvivors = true;
            document.getElementById('main-screen').style.display = 'block';
          }
          break;
      }
    },
    move(direction) {
      console.log(`Move ${direction}`);
      let currentUser = this.participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        switch (direction) {
          case 'up':
            currentUser.y -= this.isRun ? 20 : 10; //윗 방향키를 클릭 + run =>  20씩 증가
            break;
          case 'down':
            currentUser.y += this.isRun ? 20 : 10;
            break;
          case 'left':
            currentUser.x -= this.isRun ? 20 : 10;
            break;
          case 'right':
            currentUser.x += this.isRun ? 20 : 10;
            break;
        }
        console.log(`나의 현재 위치는 x: ${currentUser.x}, y: ${currentUser.y}`);
        ClientViewvue_type_script_lang_js_socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition();
      }
    },
    runAction() {
      this.isRun = true;
    },
    runStop() {
      this.isRun = false;
    },
    startMoving(direction) {
      this.move(direction);
      this.moveInterval = setInterval(() => {
        this.move(direction);
      }, 100);
    },
    stopMoving() {
      clearInterval(this.moveInterval);
    },
    updateCurrentPosition() {
      const currentUser = this.participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.currentPosition = `X: ${currentUser.x.toFixed(1)}, Y: ${currentUser.y.toFixed(1)}`;
      }
    },
    updateBubbleCount(count) {
      this.bubbleCountText = '터트린 🫧 갯수: ' + count;
      ClientViewvue_type_script_lang_js_socket.emit('bubbleBuster', {
        id: ClientViewvue_type_script_lang_js_socket.id,
        emoji: this.myEmoji,
        bCount: count
      });
    },
    startTimer() {
      //this.remainingTime = 60;  // 게임 시간 60초로 설정
      this.remainingTime = 180;
      this.gameEndSent = false;
      this.timerInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0 && !this.gameEndSent) {
          clearInterval(this.timerInterval);
          // socket.emit('endGame');
          this.gameEndSent = true; // 게임 종료 상태를 true로
        }
      }, 1000);
    },
    handleGameEnd() {
      this.gameEnd = true;
      this.showWinnerModal = true; // 모달 표시
    },
    //아이폰은 홈 화면 추가
    toggleFullscreen() {
      const elem = document.documentElement;
      if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
          document.getElementById('fullscreen-toggle').textContent = '전체 화면 끄기';
        }).catch(err => {
          console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen().then(() => {
          document.getElementById('fullscreen-toggle').textContent = '전체 화면 켜기';
        }).catch(err => {
          console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
        });
      }
    },
    showSocketId() {
      alert(`나의 소켓 ID는 ${ClientViewvue_type_script_lang_js_socket.id} 입니다 !`);
    }
  },
  mounted() {
    ClientViewvue_type_script_lang_js_socket.on('currentclientCount', clientCount => {
      this.survivorsCount = clientCount;
    });
    ClientViewvue_type_script_lang_js_socket.on('updateParticipants', participants => {
      console.log(`${ClientViewvue_type_script_lang_js_socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCount = participants.length;
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        console.log('Current User Emoji:', this.myEmoji);
      } else {
        console.log('Current user not found in participants.');
      }
    });
    ClientViewvue_type_script_lang_js_socket.on('positionUpdate', data => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        this.updateCurrentPosition();
      }
    });
    ClientViewvue_type_script_lang_js_socket.on('gameInstructions', data => {
      console.log('게임 지침:', data);
      this.gameInstructions = data; //게임 지침 설명 text
      this.isDescribing = true;
      if (data == '') {
        //게임 지침이 끝나고 난뒤 발생하는 버블
        console.log('bubbleStart !');
        this.isDescribing = false; //설명 종료
        this.gameStart = true; //접속자 수 => 버블 갯수
        this.startTimer();
      }
    });
    ClientViewvue_type_script_lang_js_socket.on('gameEnd', () => {
      clearInterval(this.timerInterval);
      this.handleGameEnd();
    });
  }
});
// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ClientViewvue_type_script_lang_js = (ClientViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ClientView.vue?vue&type=style&index=0&id=66638622&prod&scoped=true&lang=css
var ClientViewvue_type_style_index_0_id_66638622_prod_scoped_true_lang_css = __webpack_require__("94fb");

// CONCATENATED MODULE: ./src/views/ClientView.vue






/* normalize component */

var ClientView_component = Object(componentNormalizer["a" /* default */])(
  views_ClientViewvue_type_script_lang_js,
  ClientViewvue_type_template_id_66638622_scoped_true_render,
  ClientViewvue_type_template_id_66638622_scoped_true_staticRenderFns,
  false,
  null,
  "66638622",
  null
  
)

/* harmony default export */ var ClientView = (ClientView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"537fbb01-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=template&id=9f1eed20&scoped=true
var ServerViewvue_type_template_id_9f1eed20_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "host-info"
    }
  }, [_c('div', {
    staticClass: "dashboard-section"
  }, [_vm.isWaiting ? _c('div', [_c('h2', {
    staticClass: "parti"
  }, [_vm._v("접속자🦰")]), _vm._l(_vm.participantInfos, function (info) {
    return _c('div', {
      key: info.id
    }, [_vm._v(" " + _vm._s(info.emoji) + " " + _vm._s(info.id) + " ")]);
  })], 2) : _vm._e(), _vm.recordStart ? _c('div', [_c('h1', {
    staticClass: "record"
  }, [_vm._v("record🏆")]), _vm._l(_vm.sortedParticipantInfos, function (info, index) {
    return _c('div', {
      key: info.id,
      class: _vm.rankClass(index)
    }, [_vm._v(" " + _vm._s(index + 1) + "등: " + _vm._s(info.emoji) + " " + _vm._s(info.id) + " 가 " + _vm._s(info.bCount) + "개! ")]);
  })], 2) : _vm._e(), _vm.recordStart ? _c('div', {
    staticClass: "survivorCount"
  }, [_vm._v(" " + _vm._s(_vm.remainingTimeTxt) + " ")]) : _vm._e()]), _vm.isWaiting ? _c('div', [_c('h3', {
    staticClass: "parti-num"
  }, [_vm._v(_vm._s(_vm.survivorsCountText))]), _c('div', {
    staticClass: "entranceNum-info",
    attrs: {
      "id": "participantCount"
    }
  }, [_c('button', {
    staticClass: "start-game",
    on: {
      "click": _vm.startGame
    }
  }, [_vm._v("start 🏃‍♀️")])])]) : _vm._e(), _c('WinnerModal', {
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
var ServerViewvue_type_template_id_9f1eed20_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=template&id=9f1eed20&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=script&lang=js

var ServerViewvue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var ServerViewvue_type_script_lang_js = ({
  data() {
    return {
      participantInfos: [],
      survivorsCountText: '접속인원 0명',
      isWaiting: true,
      recordStart: false,
      remainingTimeTxt: '참가자들에게 게임 설명중 ...',
      timerInterval: null,
      remainingTime: 0,
      howWinnerModal: false,
      winner: null
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
        this.isWaiting = false; // 버튼 비활성화
        this.recordStart = true;
        ServerViewvue_type_script_lang_js_socket.emit('startGame');
      }
    },
    startTimer() {
      this.remainingTime = 180;
      this.timerInterval = setInterval(() => {
        this.remainingTimeTxt = `남은 종료 시간 :${this.remainingTime--}`;
        if (this.remainingTime <= 0) {
          clearInterval(this.timerInterval);
          ServerViewvue_type_script_lang_js_socket.emit('endGame');
          this.endGame();
        }
      }, 1000);
    },
    endGame() {
      ServerViewvue_type_script_lang_js_socket.emit('endGame');
      const winner = this.sortedParticipantInfos[0];
      this.winner = winner;
      this.showWinnerModal = true;
    },
    // requestRankUpdate() {
    //   socket.emit('updateRanks');
    // }
    rankClass(index) {
      switch (index) {
        case 0:
          return 'first-place';
        case 1:
          return 'second-place';
        case 2:
          return 'third-place';
        default:
          return '';
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
      }
    });
    ServerViewvue_type_script_lang_js_socket.on('bubbleBuster', data => {
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
      this.participantInfos.sort((a, b) => b.bCount - a.bCount);
      //this.requestRankUpdate(); // 랭크 업데이트 요청
    });

    // socket.on('rankUpdate', (sortedParticipants) => {
    //   this.participantInfos = sortedParticipants;
    // });
  }
});
// CONCATENATED MODULE: ./src/views/ServerView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ServerViewvue_type_script_lang_js = (ServerViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ServerView.vue?vue&type=style&index=0&id=9f1eed20&prod&scoped=true&lang=css
var ServerViewvue_type_style_index_0_id_9f1eed20_prod_scoped_true_lang_css = __webpack_require__("409b");

// CONCATENATED MODULE: ./src/views/ServerView.vue






/* normalize component */

var ServerView_component = Object(componentNormalizer["a" /* default */])(
  views_ServerViewvue_type_script_lang_js,
  ServerViewvue_type_template_id_9f1eed20_scoped_true_render,
  ServerViewvue_type_template_id_9f1eed20_scoped_true_staticRenderFns,
  false,
  null,
  "9f1eed20",
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

/***/ "63ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "65aa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "802b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_7895b319_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("63ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_7895b319_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainScreen_vue_vue_type_style_index_0_id_7895b319_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "845f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "94fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_66638622_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("09f8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_66638622_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_66638622_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a979":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_0dae9410_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d0d0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_0dae9410_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_0dae9410_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d0d0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d339":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_0f26498a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("65aa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_0f26498a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_0f26498a_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f711":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
//# sourceMappingURL=app.5017f7e0.js.map