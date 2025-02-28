console.log("Hola mundo");

let a = 5;

if (a == 10) {
    alert("es 10")
} else {
    console.log("no es 10")
}

// DOM
let domsite = document;
let tagEmplo = document.getElementById("ejemplo")
// tagEmplo.innerText= "Modificado desde JS";
// GET ELEMENT BY TAG
let tagsA = document.getElementsByTagName("a")
let tagsDiv = document.getElementsByTagName("div")
console.log(tagsA);
console.log(tagsDiv);
//  GEt ELEMENT BY ID
let idEjemplos = document.getElementById("ejemplo")
console.log(idEjemplos);



// CREA UN ELEMENTO
let nuevaImagen  = document.createElement("img");
nuevaImagen.id = "nuevaImagen";
nuevaImagen.width = 100;
nuevaImagen.height = 100;
nuevaImagen.src = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
// Agregar al body
document.body.appendChild(nuevaImagen);

let ejemplo1 = document.getElementById("ejemplo1");
ejemplo1.style.color = "red";


