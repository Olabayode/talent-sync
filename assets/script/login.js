'use strict';

const loginForm = document.getElementById('login-form');

if (loginForm) {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    
    localStorage.setItem('username', 'tester');
    localStorage.setItem('password', 'test1234');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputUsername = username.value.trim();
        const inputPassword = password.value.trim();
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        
        if (inputUsername === storedUsername && inputPassword === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'home.html';
        } else {
            errorMessage.textContent = 'Incorrect Username or Password';
        }
    });
}