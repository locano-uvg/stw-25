
import { presentations } from './presentations.js';

const grid = document.querySelector('.presentations-grid');

presentations.forEach(presentation => {
    if (!presentation.active) {
        return
    }

    const card = document.createElement('div');
    card.className = 'presentation-card';
    card.innerHTML = `
            <div style="display: flex; justify-content: center;">
            <img src="${presentation.image}" alt="${presentation.title}" 
            width="325" height="200" style="object-fit: cover;">
            </div>
            <div>
            <h2>${presentation.title}</h2>
            <p>${presentation.description}</p>
            <a href="${presentation.path}">Ver Presentación</a>
            </div>
        `;
    grid.appendChild(card);

});


const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    grid.innerHTML = '';
    presentations.forEach(presentation => {
        if (!presentation.active) {
            return;
        }
        if (presentation.title.toLowerCase().includes(searchTerm) || presentation.description.toLowerCase().includes(searchTerm)) {
            const card = document.createElement('div');
            card.className = 'presentation-card';
            card.innerHTML = `
                <div style="display: flex; justify-content: center;">
                <img src="${presentation.image}" alt="${presentation.title}" 
                width="325" height="200" style="object-fit: cover;">
                </div>
                <div>
                <h2>${presentation.title}</h2>
                <p>${presentation.description}</p>
                <a href="${presentation.path}">Ver Presentación</a>
                </div>
            `;
            grid.appendChild(card);
        }
    });
});