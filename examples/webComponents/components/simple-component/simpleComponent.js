class Componente1 extends HTMLElement {
    constructor() {
        super();        
        const shadowDOM = this.attachShadow({ mode: "open" });
        let div = document.createElement("div");
        div.id = 'card';

        let title = document.createElement("h1");
        title.id = "title";
        title.innerHTML = "Esto es un titulo es el default";
        let description = document.createElement("p");
        description.innerHTML = "Hola esta descripción viene de un componente";

        div.appendChild(title);
        div.appendChild(description);
        div.className = "card";
        shadowDOM.appendChild(div);


        let styles = document.createElement("style");
        let color = 'yellow';
        styles.innerHTML = `
            .card{
                width: 300px;
                height: 300px;
                background-color: ${color};
                color: black;
                padding: 16px;
                border-radius: 16px;
            }
        `;
        shadowDOM.appendChild(styles);
    }

    connectedCallback() {
 
        if(this.hasAttribute("title")){
            let title = this.getAttribute("title");
            this.shadowRoot.querySelector("#title").innerHTML = title;
        }

        if(this.hasAttribute('patito-color')){
            let color = this.getAttribute('patito-color');
            this.shadowRoot.querySelector('#card').style.backgroundColor = color;
        }

        console.log("Custom component element added to page.");
    }
    disconnectedCallback() {

        console.log("Custom component element removed from page.");

    }

    adoptedCallback() {
        console.log("Custom component element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Custom component element attributes changed.");

    }
}

customElements.define('componenete-patito', Componente1);