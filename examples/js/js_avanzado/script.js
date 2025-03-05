// dos espacios para poner las columnas y los elementos
// boton para generar

// UTILIZAR PALARA FUNCTION LUEGO UN NOMBRE (PARAMETROS) => {CODIGO}
function reaccionarAClick(columnas, elementos) {

    alert('Hola seleccionaste ' + columnas.value + ' columnas y ' + elementos.value + ' elementos');
}

function agregarElementos(totalElementos, matriz) {
    matriz.innerHTML = '';
    let total = document.createDocumentFragment()

    for (let index = 0; index < totalElementos; index++) {
        let item = document.createElement("div");
        item.id = 'item' + index;
        item.style.border = '1px solid black';
        item.style.borderRadius = '16px';
        item.style.width = '100%';
        item.style.height = '100%';
        item.innerText = 'Elemento ' + index;
        item.style.backgroundColor = 'blue';
        if (index % 2 == 0) {
            item.style.backgroundColor = 'blue';
        } else {

            item.style.backgroundColor = 'yellow';
        }
        total.appendChild(item);
    }
    matriz.appendChild(total);
}

function cambiarGrid(totalColumnas, matriz) {
    matriz.style.display = 'grid';
    matriz.style.gridTemplateColumns = `repeat(${totalColumnas}, 1fr)`;
    matriz.style.gridGap = '10px';
}

function crearBoton() {
    // CREAR EL BOTON

    let botonGenerar = document.createElement("button");
    botonGenerar.innerText = 'Generar layout';

    botonGenerar.addEventListener('click', () => {
        // reaccionarAClick(columnas, elementos);

        agregarElementos(elementos.value, matriz);
        cambiarGrid(columnas.value, matriz);
    });
    return botonGenerar;
}

function crearBase() {

    // obtener el contenedor general
    let contenedor = document.getElementById("contenedor");
    contenedor.style.display = 'flex';
    contenedor.style.flexDirection = 'column';
    contenedor.style.height = '100vh';

    // CREAR INPUT COLUMNA
    let columnas = document.createElement("input");
    let labelColumnas = document.createElement("label");
    labelColumnas.innerHTML = 'Ingrese columnas: ';
    columnas.id = 'columnas';
    columnas.type = 'number';
    columnas.value = 0;

    // CREAR INPUT ELEMENTOS
    let labelElementos = document.createElement("label");
    labelElementos.innerText = 'Ingrese elementos: ';
    let elementos = document.createElement("input");
    elementos.id = 'elementos';
    elementos.type = 'number';

    // Agregar los elementos
    contenedor.appendChild(labelColumnas)
    contenedor.appendChild(columnas);
    contenedor.appendChild(labelElementos);
    contenedor.appendChild(elementos);

    return contenedor;
}



// crear un div que me servira para poner los elementos
let matriz = document.createElement("div");
matriz.id = 'matriz';
matriz.style.border = '1px solid black';
matriz.style.width = '100%';
matriz.style.height = '100%';
matriz.style.backgroundColor = 'gray';


let contenedor = crearBase();
let botonGenerar = crearBoton();

contenedor.appendChild(botonGenerar);
contenedor.appendChild(matriz);

