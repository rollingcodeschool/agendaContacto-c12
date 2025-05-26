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
  const nuevoContacto = new Contacto(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value,
    inputNotas.value
  );
  console.log(nuevoContacto);
  //almacenar el objeto en la agenda
  agenda.push(nuevoContacto);
  console.log(agenda);
  guardarEnLocalstorage();
  limpiarFormulario();
  dibujarFila(nuevoContacto, agenda.length);
  //agregar un mensaje para el usuario
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${nuevoContacto.nombre} fue creado correctamente`,
    icon: "success",
  });
}

function limpiarFormulario() {
  formularioCrearContacto.reset();
}

function guardarEnLocalstorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

function cargaDatosContacto() {
  //verificar en localstorage si hay datos para mostrar en la tabla
  if (agenda.length !== 0) {
    //dibujar cada fila de la tabla con sus respectivos datos
    agenda.map((contacto, index) => dibujarFila(contacto, index + 1));
  }
  //todo mostrar un mensaje al usuario, no hay datos para mostrar
}

function dibujarFila(contacto, index) {
  //aqui voy a dibujar una sola fila con sus datos
  tablaContacto.innerHTML += `<tr>
              <th scope="row">${index} </th>
              <td>${contacto.nombre}</td>
              <td>${contacto.apellido} </td>
              <td>${contacto.telefono} </td>
              <td>${contacto.email}</td>
              <td>
                <button class="btn btn-warning">
                  <i class="bi bi-pen"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-info"><i class="bi bi-eye"></i></button>
              </td>
            </tr>`;
}

window.eliminarContacto = (id) => {
  //obtener el id del contacto a borrar
  console.log("aqui debo borrar un contacto", id);
  //buscar en la agenda cual es el contacto que tiene tal id
  const posicionContacto = agenda.findIndex((contacto)=> contacto.id === id)
  console.log(posicionContacto)
  //borrar de la agenda el contacto con id X
  agenda.splice(posicionContacto,1)
  //actualizar los datos del localstorage
 guardarEnLocalstorage();
  //actualizar la tabla de contactos
};


//declaro variables
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const formularioCrearContacto = document.querySelector("form");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputNotas = document.querySelector("#notas");
const inputImagen = document.querySelector("#imagen");
const tablaContacto = document.getElementById("tablaContacto");

//manejadores de eventos
btnAgregarContacto.addEventListener("click", abrirModalContacto);
formularioCrearContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //el usuario completa el form y debo crear un objeto contacto
  crearContacto();
});

cargaDatosContacto();
