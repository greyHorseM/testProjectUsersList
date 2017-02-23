import template from './template.pug';
import './styles.css';

export default class UsersList {
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
        //let selectedUser = this._users[userId];

        //
        let selectedUser = this._users.find(function(element, index, array){
            if (liSelectedUser.id == element.id) return element;
        });
        console.log(selectedUser);

        this._elem.dispatchEvent(new CustomEvent('user-select',{
            bubbles: true,
            detail:{
                value: selectedUser
            }
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
        return this._elem;
    }

}