const titulo = document.getElementById('h1')
const titulo2 = document.getElementById('h3')
const titulo3 = document.getElementById('p')
titulo.innerText = 'hola'


// suponemos un boton
const bt1 = document.getElementById('bt1') 
bt1.addEventListener('click', ()=>{
    titulo.innerText = 'hola 2'
    titulo2.innerText = 'hola 2'
    titulo3.innerText = 'hola 2'
})

