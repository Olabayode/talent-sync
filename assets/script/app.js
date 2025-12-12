'use strict';

if (!localStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}

const peopleGrid = document.getElementById('peopleGrid');
const profilePic = document.getElementById('profile-pic');
const modal = document.getElementById('settingsDialog');
const closeBtn = document.getElementById('closeBtn');
const signOut = document.getElementById('btnTwo');
const URL = 'https://randomuser.me/api/?results=10&inc=picture,name,location&seed=same';

// fetch(URL).then(r=>r.json()).then(console.log);

const options = {
    method: 'GET',
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

if (peopleGrid) {
    window.addEventListener('load', getUsers);
}

profilePic.addEventListener('click', ()=> {
    modal.showModal();
} )

closeBtn.addEventListener('click', ()=> {
    modal.close();
})

modal.addEventListener('click', (e) => {
    if (e.target === modal) { 
        modal.close();
    }
})

signOut.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
})




