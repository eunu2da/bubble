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

/***/ "0275":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_48f1bd2c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("46be");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_48f1bd2c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientView_vue_vue_type_style_index_0_id_48f1bd2c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1b79":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "46be":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=1e87bc7e
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ClientView.vue?vue&type=template&id=48f1bd2c&scoped=true
var ClientViewvue_type_template_id_48f1bd2c_scoped_true_render = function render() {
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
    },
    on: {
      "click": _vm.goBack
    }
  }, [_vm._m(0), _vm.showGameArea ? _c('div', {
    staticClass: "currentPosition",
    attrs: {
      "id": "currentPosition"
    }
  }, [_vm._v(" " + _vm._s(_vm.currentPosition) + " ")]) : _vm._e(), _vm.showMyCharacter ? _c('div', {
    staticClass: "myEmojiBox",
    attrs: {
      "id": "myEmoji"
    },
    on: {
      "click": _vm.showSocketId
    }
  }, [_c('h5', {
    staticClass: "me"
  }, [_vm._v(_vm._s(_vm.isHost))]), _c('span', {
    staticClass: "myCharacter"
  }, [_vm._v(_vm._s(_vm.myEmoji))])]) : _vm._e()]) : _vm._e()]), _c('div', {
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
      "participants": _vm.participants
    },
    on: {
      "updateBubbleCount": _vm.updateBubbleCount
    }
  }) : _vm._e(), _vm.showGameArea ? _c('div', {
    staticClass: "run-controls"
  }, [_c('button', {
    ref: "runButton",
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
  }, [_vm._v("🏃‍♀️")])]) : _vm._e()], 1), !_vm.gameStart ? _c('div', {
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
    staticClass: "host-controls"
  }, [_c('button', {
    staticClass: "start-game-button",
    on: {
      "click": _vm.startGame
    }
  }, [_vm._v("Start")])]) : _vm._e(), _vm.showGameArea ? _c('div', {
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
  }, [_c('p', [_vm._v(_vm._s(_vm.gameInstructions))])])]) : _vm._e()]) : _vm._e(), _vm.gameEnd ? _c('WinnerModal', {
    attrs: {
      "winner": _vm.firstPlace,
      "sortedParticipants": _vm.allParticipants
    },
    on: {
      "close": _vm.returnToMain
    }
  }) : _vm._e()], 1);
};
var ClientViewvue_type_template_id_48f1bd2c_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "back-button"
  }, [_c('img', {
    staticClass: "back_button_img",
    attrs: {
      "src": __webpack_require__("6269"),
      "draggable": "false",
      "alt": "Go Back"
    }
  })]);
}];

// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=template&id=48f1bd2c&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainScreen.vue?vue&type=template&id=7895b319&scoped=true
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=template&id=22209978&scoped=true
var GameAreavue_type_template_id_22209978_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "board"
  }, [_vm.isPlaying ? _c('img', {
    staticClass: "music-area",
    attrs: {
      "src": __webpack_require__("99e2")
    },
    on: {
      "click": _vm.toggleMusic
    }
  }) : _vm._e(), !_vm.isPlaying ? _c('img', {
    staticClass: "music-area",
    attrs: {
      "src": __webpack_require__("74dc")
    },
    on: {
      "click": _vm.toggleMusic
    }
  }) : _vm._e(), _c('audio', {
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
  })], 2)])]);
};
var GameAreavue_type_template_id_22209978_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=template&id=22209978&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GameArea.vue?vue&type=script&lang=js

var GameAreavue_type_script_lang_js_socket = Object(esm["a" /* default */])();
/* harmony default export */ var GameAreavue_type_script_lang_js = ({
  props: {
    participants: Array
  },
  data() {
    return {
      bubbles: [],
      bubbleCount: 0,
      isPlaying: false
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
    toggleMusic() {
      const audio = this.$refs.backgroundMusic;
      console.log('audioaudio', audio);
      if (this.isPlaying) {
        console.log('재생중 ? this.isPlaying?', this.isPlaying);
        audio.pause();
      } else {
        // 사용자의 인터랙션 이후에 오디오를 재생
        audio.play().catch(error => {
          console.error('재생 오류:', error);
        });
      }
      this.isPlaying = !this.isPlaying;
    },
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
              this.$refs.bubbleSound.volume = 1.0;
              this.$refs.bubbleSound.play().catch(error => {
                console.error('오디오 재생 오류:', error);
              });
            }
          });
        });
      }, 50); // 50ms마다 충돌 감지
    }
  }
});
// CONCATENATED MODULE: ./src/components/GameArea.vue?vue&type=script&lang=js
 /* harmony default export */ var components_GameAreavue_type_script_lang_js = (GameAreavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/GameArea.vue?vue&type=style&index=0&id=22209978&prod&scoped=true&lang=css
var GameAreavue_type_style_index_0_id_22209978_prod_scoped_true_lang_css = __webpack_require__("76ba");

// CONCATENATED MODULE: ./src/components/GameArea.vue






/* normalize component */

var GameArea_component = Object(componentNormalizer["a" /* default */])(
  components_GameAreavue_type_script_lang_js,
  GameAreavue_type_template_id_22209978_scoped_true_render,
  GameAreavue_type_template_id_22209978_scoped_true_staticRenderFns,
  false,
  null,
  "22209978",
  null
  
)

/* harmony default export */ var GameArea = (GameArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WinnerModal.vue?vue&type=template&id=88dea8a8&scoped=true
var WinnerModalvue_type_template_id_88dea8a8_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
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
  }, [_vm._v("×")]), _c('h2', [_vm._v("우승자 발표 🎉")]), _c('div', {
    staticClass: "winner-announcement"
  }, [_c('p', [_vm._v(_vm._s(_vm.winner.emoji) + " (" + _vm._s(_vm.winner.id) + ")가 " + _vm._s(_vm.winner.bCount) + "개의 버블을 터트렸습니다!")])]), _c('div', {
    staticClass: "all-rankings"
  }, [_c('h3', [_vm._v("전체 참가자 랭킹")]), _c('ul', _vm._l(_vm.sortedParticipants, function (participant, index) {
    return _c('li', {
      key: participant.id
    }, [_vm._v(" " + _vm._s(index + 1) + "등: " + _vm._s(participant.emoji) + " (" + _vm._s(participant.id) + ") - " + _vm._s(participant.bCount) + "개 ")]);
  }), 0)])])]);
};
var WinnerModalvue_type_template_id_88dea8a8_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/WinnerModal.vue?vue&type=template&id=88dea8a8&scoped=true

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
// EXTERNAL MODULE: ./src/components/WinnerModal.vue?vue&type=style&index=0&id=88dea8a8&prod&scoped=true&lang=css
var WinnerModalvue_type_style_index_0_id_88dea8a8_prod_scoped_true_lang_css = __webpack_require__("6346");

// CONCATENATED MODULE: ./src/components/WinnerModal.vue






/* normalize component */

var WinnerModal_component = Object(componentNormalizer["a" /* default */])(
  components_WinnerModalvue_type_script_lang_js,
  WinnerModalvue_type_template_id_88dea8a8_scoped_true_render,
  WinnerModalvue_type_template_id_88dea8a8_scoped_true_staticRenderFns,
  false,
  null,
  "88dea8a8",
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
      gameEndSent: false,
      currentRank: '',
      bubbleCount: '',
      firstPlace: {},
      allParticipants: [],
      isAndroidDevice: false,
      joystickStartX: 0,
      joystickStartY: 0,
      joystickMoveX: 0,
      joystickMoveY: 0,
      joystickMoveInterval: null,
      isHost: '',
      host: false
    };
  },
  methods: {
    startGame() {
      if (confirm(`${this.survivorsCount}명으로 게임을 시작하시겠습니까?`)) {
        ClientViewvue_type_script_lang_js_socket.emit('startGame');
      } else {
        return;
      }
    },
    returnToMain() {
      this.showWinnerModal = false;
      this.gameEnd = false;
      this.showGameArea = false;
      this.showBackButton = false;
      this.showMyCharacter = false;
      this.showPlaceholder = true;
      this.showNumOfSurvivors = true;
      this.gameStart = false;
      this.participants = [];
      this.survivorsCount = 0;
      this.currentRank = '';
      this.bubbleCount = '';
      this.firstPlace = {};
      this.allParticipants = [];
      document.getElementById('main-screen').style.display = 'block';
      ClientViewvue_type_script_lang_js_socket.disconnect();
    },
    enterGame() {
      document.getElementById('main-screen').style.display = 'none';
      this.showGameArea = true;
      this.showBackButton = true;
      this.showMyCharacter = true;
      this.showPlaceholder = false;
      this.showNumOfSurvivors = false;
      this.$nextTick(() => {
        var gameAreaSize = document.getElementById('game-area').getBoundingClientRect();
        this.gameAreaHeight = gameAreaSize.height - 48;
        console.log('서버로 전달할 참가자의 gameArea Height..', this.gameAreaHeight);
        this.gameAreaWidth = gameAreaSize.width - 48;
        console.log('서버로 전달할 참가자의 gameArea width..', this.gameAreaWidth);
        var areaSize = {
          top: gameAreaSize.height,
          right: gameAreaSize.width
        };
        console.log('areaSize:', areaSize);
        ClientViewvue_type_script_lang_js_socket.emit('newParticipant', {
          emoji: '',
          gameAreaSize: areaSize
        });
        if (this.$refs.joystick) {
          this.initJoystick();
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
            currentUser.y -= this.isRun ? 7 : 3;
            if (currentUser.y < 0) currentUser.y = 0; // 경계 체크
            break;
          case 'down':
            currentUser.y += this.isRun ? 7 : 3;
            console.log('나의 gameAreaHeight', this.gameAreaHeight);
            if (currentUser.y > this.gameAreaHeight) currentUser.y = this.gameAreaHeight; // 경계 체크  
            break;
          case 'left':
            currentUser.x -= this.isRun ? 7 : 3;
            if (currentUser.x < 0) currentUser.x = 0;
            break;
          case 'right':
            currentUser.x += this.isRun ? 7 : 3;
            console.log('나의 gameAreaWidth', this.gameAreaWidth);
            if (currentUser.x > this.gameAreaWidth) currentUser.x = this.gameAreaWidth; // 경계 체크
            break;
        }
        console.log(`나의 현재 위치는 x: ${currentUser.x}, y: ${currentUser.y}`);
        ClientViewvue_type_script_lang_js_socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition();
      }
    },
    runAction() {
      this.isRun = true;
      this.$refs.runButton.classList.add('active');
    },
    runStop() {
      this.isRun = false;
      this.$refs.runButton.classList.remove('active');
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
      console.log('서버에게 버블카운트 전달');
      ClientViewvue_type_script_lang_js_socket.emit('bubbleBuster', {
        id: ClientViewvue_type_script_lang_js_socket.id,
        emoji: this.myEmoji,
        bCount: count
      });
    },
    startTimer() {
      //this.remainingTime = 60;  // 게임 시간 60초로 설정
      this.remainingTime = 30;
      this.gameEndSent = false;
      this.timerInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0 && !this.gameEndSent) {
          clearInterval(this.timerInterval);
          this.gameEndSent = true; // 게임 종료 상태를 true로
        }
      }, 1000);
    },
    //아이폰은 홈 화면 추가
    toggleFullscreen() {
      const elem = document.documentElement;
      const toggleButton = document.getElementById('fullscreen-toggle');
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
    showSocketId() {
      alert(`나의 소켓 ID는 ${ClientViewvue_type_script_lang_js_socket.id} 입니다 !`);
    },
    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },
    initJoystick() {
      const joystickBase = this.$refs.joystickBase;
      const joystickStick = this.$refs.joystickStick;
      joystickStick.addEventListener('touchstart', this.startJoystick);
      joystickStick.addEventListener('touchmove', this.moveJoystick);
      joystickStick.addEventListener('touchend', this.endJoystick);
    },
    startJoystick(event) {
      const touch = event.touches[0];
      this.joystickStartX = touch.clientX;
      this.joystickStartY = touch.clientY;
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.joystickMoveInterval = setInterval(this.updateMovement, 50);
      this.$refs.joystickBase.classList.add('active');
    },
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
      this.$refs.joystickStick.style.transform = `translate(${moveX}px, ${moveY}px)`;
    },
    endJoystick(event) {
      event.preventDefault(); // 터치 종료 중 스크롤 방지
      this.$refs.joystickStick.style.transform = 'translate(0, 0)';
      clearInterval(this.joystickMoveInterval);
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.triggerHapticFeedback();
      this.$refs.joystickBase.classList.remove('active');
    },
    updateMovement() {
      const absX = Math.abs(this.joystickMoveX);
      const absY = Math.abs(this.joystickMoveY);
      if (absX > absY) {
        if (this.joystickMoveX > 0.1) this.move('right');else if (this.joystickMoveX < -0.1) this.move('left');
      } else {
        if (this.joystickMoveY > 0.1) this.move('down');else if (this.joystickMoveY < -0.1) this.move('up');
      }
    },
    triggerHapticFeedback() {
      console.log('Vibration Triggered');
      if (navigator.vibrate) {
        navigator.vibrate(50);
      } else {
        //아이폰
        this.addVisualFeedback();
      }
    },
    addVisualFeedback() {
      const joystickStick = this.$refs.joystickStick;
      joystickStick.classList.add('shake');
      setTimeout(() => {
        joystickStick.classList.remove('shake');
      }, 200);
    }
  },
  mounted() {
    this.isAndroidDevice = this.isAndroid();
    ClientViewvue_type_script_lang_js_socket.on('currentclientCount', clientCount => {
      this.survivorsCount = clientCount;
      console.log('접속인원 ', this.survivorsCount);
    });
    ClientViewvue_type_script_lang_js_socket.on('updateParticipants', participants => {
      console.log(`${ClientViewvue_type_script_lang_js_socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCount = participants.length;
      console.log('전달받은 participants', participants);
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === ClientViewvue_type_script_lang_js_socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        this.isHost = currentUser.isHost ? '👑방장👑' : '👔참가자👔';
        if (currentUser.isHost) {
          this.host = true;
        }
        console.log('Current User role:', this.isHost);
        console.log('Current User Emoji:', this.myEmoji);
        console.log('currentUser가 받은 위치는', currentUser.x, currentUser.y);
      } else {
        console.log('Current user not found in participants.');
      }
    });
    ClientViewvue_type_script_lang_js_socket.on('positionUpdate', data => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        console.log(`${data.id}의 포지션 변경이 발생함 x : ${participant.x}/ y : ${participant.y} `);
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
    ClientViewvue_type_script_lang_js_socket.on('rankUpdate', data => {
      console.log('나의 현재 랭킹 정보:', data);
      this.currentRank = data.rank;
      this.bubbleCount = data.bCount;
      this.firstPlace = data.firstPlace;
      this.allParticipants = data.allParticipants;
    });
    ClientViewvue_type_script_lang_js_socket.on('showRank', data => {
      console.log('datadatadata show Rank', data);
      this.gameEnd = true;
      this.firstPlace = data.whoFianlWinner;
      this.allParticipants = data.resultRank;
    });
  }
});
// CONCATENATED MODULE: ./src/views/ClientView.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ClientViewvue_type_script_lang_js = (ClientViewvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ClientView.vue?vue&type=style&index=0&id=48f1bd2c&prod&scoped=true&lang=css
var ClientViewvue_type_style_index_0_id_48f1bd2c_prod_scoped_true_lang_css = __webpack_require__("0275");

// CONCATENATED MODULE: ./src/views/ClientView.vue






/* normalize component */

var ClientView_component = Object(componentNormalizer["a" /* default */])(
  views_ClientViewvue_type_script_lang_js,
  ClientViewvue_type_template_id_48f1bd2c_scoped_true_render,
  ClientViewvue_type_template_id_48f1bd2c_scoped_true_staticRenderFns,
  false,
  null,
  "48f1bd2c",
  null
  
)

/* harmony default export */ var ClientView = (ClientView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c6feb002-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ServerView.vue?vue&type=template&id=7a9a1fd5&scoped=true
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

/***/ "6269":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/back_btn.e820a96f.png";

/***/ }),

/***/ "6346":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_88dea8a8_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d122");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_88dea8a8_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinnerModal_vue_vue_type_style_index_0_id_88dea8a8_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "63ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "74dc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sound_off.2b67bf50.png";

/***/ }),

/***/ "7651":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/bubble_pop.38d450f8.mp4";

/***/ }),

/***/ "76ba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_22209978_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1b79");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_22209978_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GameArea_vue_vue_type_style_index_0_id_22209978_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "8d19":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f8f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ServerView_vue_vue_type_style_index_0_id_7a9a1fd5_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "99e2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sound_on.d9f9dc9d.png";

/***/ }),

/***/ "c0d6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/wait.afbadb5e.png";

/***/ }),

/***/ "d122":
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
//# sourceMappingURL=app.e18d76db.js.map