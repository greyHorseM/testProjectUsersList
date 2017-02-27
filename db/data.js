'use strict';
/*
export let users = [
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
*/

export default class usersDB{
  constructor(){

  }

  getUsersFromDB(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://test-api.javascript.ru/v1/mbaydak/users', false);
    xhr.send();
    if(xhr.status != 200){
      alert( xhr.status + ': ' + xhr.statusText );
    } else{
      alert(xhr.responseText);
      return JSON.parse(xhr.responseText);
    }
  }

  addUserToDB({user}){
    let xhr = new XMLHttpRequest();
    let jsonNewUser = JSON.stringify({
      fullName: user.fullName,
      email: user.email
    });
    xhr.open("POST", 'http://test-api.javascript.ru/v1/mbaydak/users', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function(e){
      return console.log(JSON.parse(xhr.responseText));
    }
    xhr.send(jsonNewUser);
  }

  clearDB(){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://test-api.javascript.ru/v1/mbaydak/users', false);
        xhr.send();
  }
}
