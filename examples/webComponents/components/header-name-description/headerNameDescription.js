class HeaderNameDescription extends HTMLElement{

    constructor(){
        super();

        let shadowDOM = null;
        shadowDOM = this.attachShadow({mode: "open"});

        // Add Css Reference
        const link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./components/header-name-description/headerNameDescription.css");
        shadowDOM.appendChild(link);

        const newDiv = document.createElement('div');
        newDiv.id = "container";
        const newH1 = document.createElement('h1');
        
        if(this.hasAttribute('data-title')){
            newH1.innerText = this.getAttribute('data-title');
        }else{
            newH1.innerText = 'Add your title';
            newH1.className = "notitle";
        }

        const newP = document.createElement('p');
        newP.textContent = this.getAttribute('data-description');;

        newDiv.appendChild(newH1);
        newDiv.appendChild(newP);

        shadowDOM.appendChild(newDiv);
    }
}

customElements.define('header-name-description', HeaderNameDescription);