
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Fetch Fruits';
    fetchButton.onclick = fetchFruits;

    // const clearButton = document.createElement('button');
    // clearButton.textContent = 'Clear';
    // clearButton.onclick = clearResults;
    // clearButton.style.display = 'none';

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';

    container.appendChild(fetchButton);
    // container.appendChild(clearButton);
    container.appendChild(resultsContainer);
    document.body.appendChild(container);
});

function fetchFruits() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Loading fruits...';

    fetch('https://api.api-onepiece.com/v2/fruits/en')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.style.width = '80%';
            resultsContainer.style.height = '100vh';
            resultsContainer.style.margin = '0 auto';
            resultsContainer.style.overflow = 'auto';

            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'grid';
            resultsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            resultsContainer.style.gap = '10px';
            // filter all data where filename has something after the url https://images.api-onepiece.com/fruits/
            dataImages = data.filter(fruit => fruit.filename !== 'https://images.api-onepiece.com/fruits/');
            // get random 10 fruits
            dataImages = dataImages.sort(() => Math.random() - 0.5).slice(0, 10);
            dataImages.forEach(fruit => {
                const fruitElement = document.createElement('div');
                fruitElement.innerHTML = `
                    <p>ID: ${fruit.id}</p>
                    <p>Name: ${fruit.name}</p>
                    <img src="${fruit.filename}" alt="${fruit.name}" width="100px" />
                `;

                fruitElement.style.border = '1px solid #ccc';
                fruitElement.style.padding = '10px';
                fruitElement.style.borderRadius = '16px';
                resultsContainer.appendChild(fruitElement);
            });
            document.querySelector('button:nth-of-type(2)').style.display = 'block';
        })
        .catch(error => console.error('Error fetching fruits:', error));
}

function clearResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    document.querySelector('button:nth-of-type(2)').style.display = 'none';
}
