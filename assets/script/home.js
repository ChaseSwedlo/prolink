'use strict';

const textarea = document.querySelector('.text-area');
const feed = document.querySelector('.post-feed');
const postButton = document.querySelector('.post-button');
const fileInput = document.getElementById('file-input');
const fileInputLabel = document.querySelector('.file-label');
const fileName = document.querySelector('.file-name');
const randomUsers = [];
let postTitle = '';
let postContent = '';
let post = '';
let imageDataUrl = '';
let pfp = `<img src='./assets/media/pfp1.jpg' alt="pfp">`;

function buildPost() {
    let name = `<h3>James Edwards</h3>`;
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = new Date().toLocaleDateString('en-EN', options);
    let dateHTML = `<p>${date}</p>`;
    postTitle = `<div class="post-title"><div class="post-pfp">${pfp}${name}</div>${dateHTML}</div>`;
    let text = textarea.value.trim();
    if (text !== '') {
        postContent = `<p class="post-text">${text}</p>`;
        if (imageDataUrl !== '') {
            postContent += `<img class="post-img" src="${imageDataUrl}" alt="img">`;
        }
    } else if (imageDataUrl !== '') {
        postContent = `<img class="post-img" src="${imageDataUrl}" alt="img">`;
    } else {
        postContent = ``;
    }
    post = postContent !== '' ? `<div class="post">${postTitle}${postContent}</div>` : '';
}

function clear() {
    postTitle = '';
    postContent = '';
    post = '';
    imageDataUrl = '';
    textarea.value = '';
    fileName.innerText = '';
    fileInput.value = '';
}

postButton.addEventListener('click', () => {
    buildPost();
    let current = feed.innerHTML;
    feed.innerHTML = post;
    feed.innerHTML += current;
    clear();
});

fileInput.addEventListener('change', (event) =>{
    let file = event.target.files[0];
    let reader = new FileReader();
    fileName.innerText = file ? file.name : '';
    reader.onload = function(event) {
        imageDataUrl = event.target.result;
    };
    reader.readAsDataURL(file);
});

const userNames = [];
const postNameOne = document.querySelector('.init-post-name');
const postNameTwo = document.querySelector('.init-post-name-two');
const imgOne = document.querySelector('.one');
const imgTwo = document.querySelector('.two');
const imgList = [imgOne, imgTwo];
const postList = [postNameOne, postNameTwo];
function saveUsersNames(users) {
    console.log(users);
    let count = 0;
    for(let i = 0; i < users.length; i++) {
        if(i < 2) {
            postList[count].innerText = `${users[i].name.first} ${users[i].name.last}`;
            imgList[count].innerHTML = `<img src=${users[i].picture.medium} alt="pfp">` + imgList[count].innerHTML;
            count++;
        }
        else
            buildPerson(users[i]);
    }
}

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
    mode: 'cors'
}

const URL = 'https://randomuser.me/api/?nat=CA&results=12&seed=same';
async function getUsers(endpoint) {
    try {
        const result = await fetch(URL, options);
        if(!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }
        const data = await result.json();
        console.log(data.results);
        saveUsersNames(data.results);
    } catch(error) {
        console.log(error.message);
    }
}
getUsers(URL);

const people = document.querySelector('.people');

function buildPerson(person) {
    let html = `
        <div class="person">
            <img src=${person.picture.medium}>
            <div class="person-text">
                <h4>${person.name.first} ${person.name.last}</h5>
                <p>${person.location.city}</p>
            </div>
            <i class="fa-solid fa-plus"></i>
        </div>
    `;
    people.innerHTML += html;
}