fetch("./components/image-card/imageCard.html")
  .then((stream) => stream.text())
  .then((htmlFile) => renderComponent(htmlFile));

function renderComponent(htmlFile) {
  class ImageCard extends HTMLElement {
    constructor() {
      super();
      const shadowDOM = this.attachShadow({ mode: "open" });
      shadowDOM.innerHTML = htmlFile;

      // Import CSS
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "./components/image-card/imageCard.css");
      shadowDOM.appendChild(link);
      
    }

    // Callback
    connectedCallback() {
      const { shadowRoot, shadowDOM } = this;
      console.log('Custom component element added to page.');
      // entry parameters
      let image = "https://www.dklo.co/DkLMRsT/cfDftOpaytr?u=EWLlMWiZJGGm";
      let title = "New Title";
      let description = "New Description for the Image";

      if (this.hasAttribute("data-title")) {
        title = this.getAttribute("data-title");
      }
      if (this.hasAttribute("data-description")) {
        description = this.getAttribute("data-description");
      }
      if (this.hasAttribute("data-image")) {
        image = this.getAttribute("data-image");
      }

      let img1 = shadowRoot.getElementById('image1');
      img1.src = image;

      let title1 = shadowRoot.getElementById('title');
      title1.innerText = title;
      let description1 = shadowRoot.getElementById('description');
      description1.innerText = description;
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

  customElements.define("image-card", ImageCard);
}
