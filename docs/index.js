
import { presentations } from './presentations.js';

const grid = document.querySelector('.presentations-grid');

presentations.forEach(presentation => {
    const card = document.createElement('div');
    card.className = 'presentation-card';
    card.innerHTML = `
            <img src="${presentation.image}" alt="${presentation.title}" width="325" height="200" style="object-fit: cover;">
            <h2>${presentation.title}</h2>
            <p>${presentation.description}</p>
            <a href="${presentation.path}">Ver Presentación</a>
        `;
    grid.appendChild(card);
});