'use strict';

import UsersList from './list/usersList';
import UserForm from './form/userForm';
import {users} from './db/data';

let container = document.querySelector('.users-block');

let usersList = new UsersList({users: users});
container.appendChild(usersList.getElem());

let userForm = new UserForm({users: users});
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