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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_data__ = __webpack_require__(0);




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
        //let form = document.forms[0];
        //this.inputNameNode = document.body.querySelector('#name');
        let userId = e.target.getAttribute('id');
        //getting user object from db
        this.currentUser = this.users.find(function(element, index, array){
            if (element.id == userId) return element;
        });
        //put user data to DOM
        this.inputNameNode.setAttribute("value", this.currentUser.name);
        this.inputSurnameNode.setAttribute("value", this.currentUser.surname);
        //let containerEditPanel = document.querySelector('.users-block__edit-panel');
        //containerEditPanel.appendChild(label);
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

    updateUserData(){
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
        this.loadUserData();
    }

    markAsChanged(e){
        this.saveButton.disabled = false;
        this.changedInputs = [];
        this.changedInputs.push(e.target);
    }
}

let usersDom = new User({
    users: __WEBPACK_IMPORTED_MODULE_0__db_data__["a" /* users */]
});


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map