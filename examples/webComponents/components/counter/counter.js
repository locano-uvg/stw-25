class Counter extends HTMLElement {
    constructor() {
        super();
        this.count = 0;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
               body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                
            }

            .counter {
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .counter h1 {
                color: #333;
                margin-bottom: 1.5rem;
            }

            .counter-display {
                margin: 1.5rem 0;
            }

            .counter-display h2 {
                font-size: 3rem;
                margin: 0;
                color: #2c3e50;
            }

            .counter-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            button {
                padding: 0.5rem 1.5rem;
                font-size: 1.5rem;
                border: none;
                border-radius: 5px;
                background-color: #3498db;
                color: white;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            button:hover {
                background-color: #2980b9;
            }

            </style>
            <div class="counter">
            <h1>Contador Web Components</h1>
            <div class="counter-display">
                <h2 id="counter">${this.count}</h2>
            </div>
            <div className="counter-buttons">
                <button id="decrement">-</button>
                <button id="increment">+</button>
            </div>
            </div>
            
        </div>
        `;
    }

    addEventListeners() {
        this.shadowRoot.getElementById('increment').addEventListener('click', () => {
            this.count++;
            this.updateDisplay();
        });

        this.shadowRoot.getElementById('decrement').addEventListener('click', () => {
            this.count--;
            this.updateDisplay();
        });
    }

    updateDisplay() {
        this.shadowRoot.getElementById('counter').innerHTML = this.count;
    }
}

customElements.define('counter-component', Counter); 