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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return users; });


let users = [
    {
        id: 1,
        name: 'Алекс',
        surname: 'Алексеев'
    },
    {
        id: 2,
        name: 'Петр',
        surname: 'Петров'
    },
    {
        id: 3,
        name: 'Ольга',
        surname: 'Ольгович'
    }
];






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_css__);




class UserForm{
    constructor({users}){
        this._users = users;
        this._currentUser = users[0];
        this._render = this._render.bind(this);
    }

    _render(){
        let tmp = document.createElement('div');
        tmp.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_pug___default()({
            item: this._currentUser
        });
        this.elem = tmp.firstElementChild;
    }

    getElem(){
        if (!this.elem){
            this._render();
        }
        return this.elem;
    }

    loadUserData(selectedUser){
        this._currentUser = selectedUser;
        this._render();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserForm;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_css__);



class UsersList {
    constructor({users}){
        this._users = users;
        this._render();
        this.onClick = this.onClick.bind(this);
        this._elem.addEventListener('click', this.onClick);
        console.log('users list loaded!');
    }

    onClick(event){
        event.preventDefault();
        let liSelectedUser = event.target;
        let ulUsersList = liSelectedUser.parentNode;
        for (let li of ulUsersList.children){
            li.classList.remove('selected');
        }
        liSelectedUser.classList.add('selected');
        let userId = liSelectedUser.getAttribute('id');
        let selectedUser = this._users[userId];

        this._elem.dispatchEvent(new CustomEvent('user-select',{
            bubbles: true,
            detail:{
                value: selectedUser
            }
        }));
    }

    _render(){
        let tmp = document.createElement('div');
        tmp.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_pug___default()({
            items: this._users
        });
        this._elem = tmp.firstElementChild;
    }

    getElem(){
        if(!this._elem){
            this._render();
        }
        return this._elem;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = UsersList;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (item) {pug_html = pug_html + "\u003Cdiv class=\"users-block__user-form\"\u003E\u003Cform name=\"user-data\"\u003E\u003Cfieldset\u003E\u003Clegend\u003EДанные пользователя\u003C\u002Flegend\u003E\u003Clabel\u003EИмя\u003C\u002Flabel\u003E\u003Cinput" + (" id=\"fullName\" type=\"text\" readonly"+pug.attr("value", `${item.name}`, true, true)) + "\u003E\u003Clabel\u003EФамилия\u003C\u002Flabel\u003E\u003Cinput" + (" id=\"email\" type=\"text\" readonly"+pug.attr("value", `${item.surname}`, true, true)) + "\u003E\u003Cinput type=\"button\" value=\"Редактировать\"\u003E\u003Cinput type=\"button\" value=\"Сохранить\" disabled\u003E\u003C\u002Ffieldset\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";}.call(this,"item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (items) {pug_html = pug_html + "\u003Cdiv class=\"users-block__users-list\"\u003E\u003Cinput type=\"button\" value=\"Добавить\"\u003E\u003Cul\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("id", `${item.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${item.name} ${item.surname}`) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("id", `${item.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${item.name} ${item.surname}`) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_usersList__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_userForm__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_data__ = __webpack_require__(1);






let container = document.querySelector('.users-block');

let usersList = new __WEBPACK_IMPORTED_MODULE_0__list_usersList__["a" /* default */]({users: __WEBPACK_IMPORTED_MODULE_2__db_data__["a" /* users */]});
container.appendChild(usersList.getElem());

let userForm = new __WEBPACK_IMPORTED_MODULE_1__form_userForm__["a" /* default */]({users: __WEBPACK_IMPORTED_MODULE_2__db_data__["a" /* users */]});
container.appendChild(userForm.getElem());

usersList.getElem().addEventListener('user-select', function(event) {
    let selectedUser = event.detail.value;
    userForm.loadUserData(selectedUser);
});


/*
class User{
    constructor({users}){
        this.users = users;
        this.selectUser = this.selectUser.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.editUserData = this.editUserData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
        this.markAsChanged = this.markAsChanged.bind(this);
        let ul = document.createElement('ul');
        for(let user of this.users){
            this.li = document.createElement('li');
            this.li.innerText = user.name;
            this.li.setAttribute('id', user.id);
            this.li.addEventListener('mousedown', this.selectUser);
            this.li.addEventListener('mousedown', this.loadUserData);
            ul.appendChild(this.li);
        }
        let containerUsersList = document.querySelector('.users-block__users-list');
        containerUsersList.appendChild(ul);
        this.ulUsersListDOM = ul;
        let editButton = document.querySelector('#edit-button');
        editButton.addEventListener('click', this.editUserData);
        this.saveButton = document.querySelector('#save-button');
        this.saveButton.addEventListener('click', this.updateUserData);
        this.inputNameNode = document.body.querySelector('#name');
        this.inputSurnameNode = document.body.querySelector('#surname');
        this.inputs = [];
        this.inputs.push(this.inputNameNode, this.inputSurnameNode);
        for (let input of this.inputs){
            input.addEventListener('input', this.markAsChanged);
        }
    }

    selectUser(e){
        for (let child of this.ulUsersListDOM.children){
            child.classList.remove('selected');
        }
        e.target.classList.add('selected');
    }

    loadUserData(e){
        this.clearEditData();
        //getting nodes
        let userId = e.target.getAttribute('id');
        //getting user object from db
        this.currentUser = this.users.find(function(element, index, array){
            if (element.id == userId) return element;
        });
        //put user data to DOM
        this.renderDOM(this.currentUser);
    }

    renderDOM(){
        this.inputNameNode.setAttribute("value", this.currentUser.name);
        this.inputSurnameNode.setAttribute("value", this.currentUser.surname);
    }

    clearEditData(){
        this.inputNameNode.setAttribute("value","");
        this.inputSurnameNode.setAttribute("value","");
    }

    editUserData(){

        for (let input of this.inputs){
            input.readOnly = false;
        }
    }

    updateUserData(e){
        this.saveButton.disabled = true;
        for (let input of this.inputs){
            input.readOnly = true;
        }
        for (let input of this.changedInputs){
            let inputName = input.getAttribute('id');
            console.log(this.currentUser[inputName]);
            this.currentUser[inputName] = '999';
            console.log(this.currentUser[inputName]);
        }
        this.renderDOM(this.currentUser);
    }

    markAsChanged(e){
        this.saveButton.disabled = false;
        this.changedInputs = [];
        this.changedInputs.push(e.target);
    }
}

let usersDom = new User({
    users: users
});
*/

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map