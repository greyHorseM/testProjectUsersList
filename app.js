'use strict';

import {users} from './db/data';

class User{
    constructor({users}){
        this.users = users;
        this.selectUser = this.selectUser.bind(this);
        let ul = document.createElement('ul');
        for(let user of this.users){
            let li = document.createElement('li');
            li.innerText = user.name;
            li.setAttribute('id', '1');
            li.addEventListener('mousedown', this.selectUser);
            ul.appendChild(li);
        }
        let containerUsersList = document.querySelector('.users-block__users-list');
        containerUsersList.appendChild(ul);
        this.ulUsersListDOM = ul;
    }

    selectUser(e){
        for (let child of this.ulUsersListDOM.children){
            child.classList.remove('selected');
        }
        e.target.classList.add('selected');
    }

    openUserEditPanel(){

    }

}

let usersDom = new User({
    users: users
});
