import Contacto from "./classContacto.js";

// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function agregarContacto(){
   const modalCrearContacto = new bootstrap.Modal(document.getElementById('crearContacto'));
    //mostrar ventana modal
    modalCrearContacto.show();

}
//el usuario completa el form y debo crear un objeto contacto

//declaro variables
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
const formularioCrearContacto = document.querySelector('form');

//manejadores de eventos
btnAgregarContacto.addEventListener('click', agregarContacto)
formularioCrearContacto.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('aqui deberia crear un objeto contacto')
    //crear un objeto Contacto
    const nuevoContacto = new Contacto('juan', 'perez','23423423','juanperez@mail.com')
    console.log(nuevoContacto)
})