import template from './template.pug';
import './styles.css';


export default class UserForm{
    constructor({users}){
        this._users = users;
        this._currentUser = {fullName: "", email: ""};
        this._render = this._render.bind(this);
    }

    _render(){
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            item: this._currentUser
        });
        this.elem = tmp.firstElementChild;
        let buttonSave = this.elem.querySelector("#buttonSave");
        this.saveUser = this.saveUser.bind(this);
        buttonSave.addEventListener('click', this.saveUser);
    }

    getElem(){
        this._render();
        console.log(this.elem);
        return this.elem;
    }

    loadUserData(selectedUser){
        this._currentUser = selectedUser;
    }

    addUser(){
      let input = this.elem.querySelector("#fullName");
      input.focus();
    }

    saveUser(){
      console.log("click");
      let fullName = this.elem.querySelector("#fullName").innerHTML;
      let email = this.elem.querySelector("#email").innerHTML;
      this.elem.dispatchEvent(new CustomEvent('addUserToDB',{
        bubbles: true,
        detail: {
          user: {
            fullName: fullName,
            email: email
          }
        }
      }));
    }
}
