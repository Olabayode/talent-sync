'use strict';

localStorage.setItem('username', 'tester');
localStorage.setItem('password', 'test1234');


const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('errorMessage');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const inputUsername = username.value.trim();
    const inputPassword = password.value.trim();

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if(inputUsername === storedUsername && inputPassword === storedPassword){
        localStorage.setItem('isLoggedIn', 'true')
        
        window.location.href = 'home.html'
    } else {
        errorMessage.textContent = 'Incorrect Credentials'
    }
})
