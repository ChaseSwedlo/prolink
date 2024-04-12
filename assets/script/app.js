'use strict';

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const login = document.querySelector('.login-button');
const error = document.querySelector('.incorrect');
const google = document.querySelector('.google');
const facebook = document.querySelector('.facebook');
const email = document.querySelector('.email');

function setCredentials() {
    localStorage.setItem('username', 'user');
    localStorage.setItem('password', 'password');
}
setCredentials();

function checkCredentials() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const isUsernameValid = username.value === storedUsername;
    username.style.borderColor = isUsernameValid ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 10, 10, 0.2)';
    const isPasswordValid = password.value === storedPassword;
    password.style.borderColor = isPasswordValid ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 10, 10, 0.2)';
    if (isUsernameValid && isPasswordValid) {
        changePage();
        error.style.opacity = 0;
    } else { error.style.opacity = 1; }
}

function changePage() {
    username.value = '';
    password.value = '';
    setInterval(() => { window.location.href = 'home.html'; }, 460);
}

login.addEventListener("click", (event) => {
    event.preventDefault();
    checkCredentials();
});

email.addEventListener("click", event => { event.preventDefault(); });
google.addEventListener("click", event => { event.preventDefault(); });
facebook.addEventListener("click", event => { event.preventDefault(); });