class SimpleComponent extends HTMLElement {
    constructor() {
        super();
        
        const shadowDOM = this.attachShadow({ mode: "open" });

        // Add Css Reference
        const link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./components/simple-component/simpleComponent.css");
        shadowDOM.appendChild(link);

        // Add Card
        const card = document.createElement('div');
        card.setAttribute("class", "card");

        // Add Title
        const title = document.createElement('h1');
        title.setAttribute("id", "title");
        title.innerHTML = "Titulo de la card";
        card.appendChild(title);
        
        // Add Description
        const description = document.createElement('p');
        description.setAttribute("id", "description");
        description.innerHTML = "Description de la card";
        card.appendChild(description);
        shadowDOM.appendChild(card);
    }

    connectedCallback() {
 
    //   const { shadowRoot } = this;
    //   const title = shadowRoot.getElementById("title");
    //   const description = shadowRoot.getElementById("description");
    //   title.innerHTML = "Title";
    //   description.innerHTML = "Description";

    //     if (this.hasAttribute("title")) {
    //         title.innerHTML = this.getAttribute("title");
    //     }
    //     if (this.hasAttribute("description")) {
    //         description.innerHTML = this.getAttribute("description");
    //     }

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

customElements.define('simple-component', SimpleComponent);