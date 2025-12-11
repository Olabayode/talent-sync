'use strict';


const loginForm = document.getElementById('login-form');
const peopleGrid = document.getElementById('peopleGrid');
const URL = 'https://randomuser.me/api/?results=10&inc=picture,name,location&seed=same';

// fetch(URL).then(r=>r.json()).then(console.log);

const options = {
    method: 'GET',
}
if (loginForm) {
    const errorMessage = document.getElementById('errorMessage');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
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

// People grid code (runs on home.html)
if (peopleGrid) {
    window.addEventListener('load', getUsers);
}


async function getUsers(){
    const peopleGrid = document.getElementById('peopleGrid');
    if (!peopleGrid) return;
    try {
        const result = await fetch(URL);
        if(!result.ok){
            throw new Error(`${result.statusText} (${result.status})`);
        }
        const data = await result.json();

        peopleGrid.innerHTML = ''
        data.results.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';

            const fullName = `${person.name.title} ${person.name.first} ${person.name.last}`;

            const city = person.location.city;
            const profilePicture = person.picture.thumbnail;

            card.innerHTML = `<img src=${profilePicture} alt=${fullName} class = 'profilePicture'> 
                <div class = 'name'>${fullName}</div>
                <div class = 'city'>${city}</div>
            `;

            peopleGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching people', error)
        peopleGrid.innerHTML = `<div class= error>Failed to load people, try again later</div>`
    }
}

