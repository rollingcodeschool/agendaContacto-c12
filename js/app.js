import Contacto from "./classContacto.js";

// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
  const modalCrearContacto = new bootstrap.Modal(
    document.getElementById("crearContacto")
  );
  //mostrar ventana modal
  modalCrearContacto.show();
}

function crearContacto() {
//todo traer todos los datos del formulario validados
//crear un objeto Contacto
  const nuevoContacto = new Contacto(inputNombre.value, inputApellido.value, inputTelefono.value, inputEmail.value, inputImagen.value, inputNotas.value);
  console.log(nuevoContacto);
  //almacenar el objeto en la agenda
  agenda.push(nuevoContacto)
  console.log(agenda);
  guardarEnLocalstorage();
  limpiarFormulario();
}

function limpiarFormulario(){
    formularioCrearContacto.reset()
}

function guardarEnLocalstorage(){
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
}

//declaro variables
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const formularioCrearContacto = document.querySelector("form");
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];
console.log(agenda)
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputTelefono = document.querySelector('#telefono');
const inputNotas = document.querySelector('#notas');
const inputImagen = document.querySelector('#imagen');


//manejadores de eventos
btnAgregarContacto.addEventListener("click", abrirModalContacto);

formularioCrearContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //el usuario completa el form y debo crear un objeto contacto
  crearContacto();
});
