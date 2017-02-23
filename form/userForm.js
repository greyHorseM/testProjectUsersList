import template from './template.pug';
import './styles.css';


export default class UserForm{
    constructor({users}){
        this._users = users;
        this._currentUser = {};
        this._render = this._render.bind(this);
    }

    _render(){
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            item: this._currentUser
        });
        this.elem = tmp.firstElementChild;
    }

    getElem(){
        this._render();
        return this.elem;
    }

    loadUserData(selectedUser){
        this._currentUser = selectedUser;
    }

}