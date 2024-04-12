'use strict';

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const login = document.querySelector('.login-button');

function setCredentials() {
    localStorage.setItem('username', 'user');
    localStorage.setItem('password', 'password');
}
setCredentials();

function checkCredentials() {
    let validUser = false;
    let validPassword = false;
    if(username.value === localStorage.getItem('username')) {
        validUser = true;
        username.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    }
    else {
        validUser = false;
        username.style.borderColor = 'rgba(255, 10, 10, 0.2)';
    }
    if(password.value === localStorage.getItem('password')) {
        validPassword = true;
        password.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    }
    else {
        validPassword = false;
        password.style.borderColor = 'rgba(255, 10, 10, 0.2)';
    }
    if(validPassword && validUser) {
        changePage();
    }
}

function changePage() {
    username.value = '';
    password.value = '';
    setInterval(() => { window.location.replace('home.html'); }, 400);
}

login.addEventListener("click", (event) => {
    event.preventDefault();
    checkCredentials();
});