
function crearCards(items_por_columna, layout) {
    for (let i = 0; i < items_por_columna; i++) {
        let div = document.createElement("div");
        div.style.backgroundColor = "lightblue";
        div.style.border = "1px solid black";
        div.style.height = "100px";
        div.style.width = "100%";
        div.textContent = "Item " + i;
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        layout.appendChild(div);
    }
}

function crearLayout() {
    let columnas = document.getElementById("input-column").value;
    let items_por_columna = document.getElementById("input-row").value;
    let layout = document.getElementById("layout");
    layout.innerHTML = "";
    layout.style.display = "grid";
    layout.style.gridTemplateColumns = "repeat(" + columnas + ", 1fr)";
    layout.style.gridGap = "10px";
    crearCards(items_por_columna, layout);
}

function crearBoton() {
    let boton = document.createElement("button");
    boton.innerHTML = "Generar Layout";
    boton.onclick = function () {
        crearLayout();
    }
    return boton;
}


function crearInput() {
    let div1 = document.createElement("div");
    div1.style.display = "flex";

    let text = document.createElement("p");
    text.innerHTML = "Ingrese el número de columnas";
    div1.appendChild(text);


    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Ingrese el número de columnas";
    input.id = "input-column";
    div1.appendChild(input);
    return div1;
}

function crearInput2() {
    let div1 = document.createElement("div");
    div1.style.display = "flex";

    let text = document.createElement("p");
    text.innerHTML = "Ingrese el número de elementos";
    div1.appendChild(text);

    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Ingrese el número de items por columna";
    input.id = "input-row";
    div1.appendChild(input);
    return div1;
}

let container = document.createElement("div");
container.id = "layout";
container.style.width = "100%";
container.style.height = "100%";

let btn = crearBoton();
let input = crearInput();
let input2 = crearInput2();
document.body.appendChild(input);
document.body.appendChild(input2);
document.body.appendChild(btn);
document.body.appendChild(container);