import template from './template.pug';
import './styles.css';

export default class UsersList {
    constructor({users}){
        this._users = users;
        this._render();
        this.onClick = this.onClick.bind(this);
        this._elem.querySelector("#list").addEventListener('click', this.onClick);
        let buttonClear = this._elem.querySelector("#buttonClear");
        this.clearList = this.clearList.bind(this);
        buttonClear.addEventListener('click', this.clearList);
        let buttonAddUser = this._elem.querySelector("#buttonAdd");
        this.addUser = this.addUser.bind(this);
        buttonAddUser.addEventListener('click', this.addUser);
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
        //let selectedUser = this._users[userId];

        //
        let selectedUser = this._users.find(function(element, index, array){
            if (liSelectedUser.id == element._id) return element;
        });
        console.log(selectedUser);

        this._elem.dispatchEvent(new CustomEvent('user-select',{
            bubbles: true,
            detail:{
                value: selectedUser
            }
        }));
    }

    clearList(){
      let ul = document.getElementsByTagName('ul')[0];
      ul.remove();
      this._elem.dispatchEvent(new CustomEvent('clearDB',{
        bubbles: true,
        detail:{}
      }));
    }

    addUser(){
      this._elem.dispatchEvent(new CustomEvent('addUser',{
        bubbles: true,
        detail:{}
      }));
    }

    _render(){
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            items: this._users
        });
        this._elem = tmp.firstElementChild;
    }

    getElem(){
        if(!this._elem){
            this._render();
        }
        console.log(this._elem);
        return this._elem;
    }

}
