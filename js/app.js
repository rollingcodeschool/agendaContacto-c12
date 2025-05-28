import Contacto from "./classContacto.js";

// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
  const modalCrearContacto = new bootstrap.Modal(
    document.getElementById("crearContacto")
  );
  limpiarFormulario();
  //mostrar ventana modal
  modalCrearContacto.show();
  creandoContacto = true;
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
                <button class="btn btn-warning" onclick="prepararContacto('${contacto.id}')">
                  <i class="bi bi-pen"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-info" onclick="verContacto('${contacto.id}')"><i class="bi bi-eye"></i></button>
              </td>
            </tr>`;
}

window.eliminarContacto = (id) => {
  Swal.fire({
    title: "Estas por eliminar un contacto",
    text: "si decides eliminar, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#78c2ad",
    cancelButtonColor: "#ff7851",
    confirmButtonText: "Borrar",
    cancelButtonText: "Salir",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //aqui agrego mi codigo si quiero borrar
      //obtener el id del contacto a borrar
      //buscar en la agenda cual es el contacto que tiene tal id
      const posicionContacto = agenda.findIndex(
        (contacto) => contacto.id === id
      );
      //borrar de la agenda el contacto con id X
      agenda.splice(posicionContacto, 1);
      //actualizar los datos del localstorage
      guardarEnLocalstorage();
      //actualizar la tabla de contactos
      tablaContacto.removeChild(tablaContacto.children[posicionContacto]);

      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto se borro exitosamente",
        icon: "success",
      });
    }
  });
};

function editarContacto() {
  console.log("aqui tengo que modificar los datos del contacto");
  //tomar los datos del formulario
  console.log(idContacto);
  //buscar en el array a donde esta el contacto que estoy editando para actualizar sus propiedades.
  const posicionContactoActualizar = agenda.findIndex(
    (contacto) => contacto.id === idContacto
  );
  agenda[posicionContactoActualizar].nombre = inputNombre.value;
  agenda[posicionContactoActualizar].apellido = inputApellido.value;
  agenda[posicionContactoActualizar].telefono = inputTelefono.value;
  agenda[posicionContactoActualizar].email = inputEmail.value;
  agenda[posicionContactoActualizar].notas = inputNotas.value;
  agenda[posicionContactoActualizar].imagen = inputImagen.value;
  //actualizar el localstorage
  guardarEnLocalstorage();
  //mostrar un mensaje al usuario indicando que se actualizo el contacto
   Swal.fire({
    title: "Contacto modificado",
    text: `El contacto ${agenda[posicionContactoActualizar].nombre} fue modificado correctamente`,
    icon: "success",
  });
  //todo: actualizar la tabla de contactos
  //traer la fila de la tabla que coincide con la variable 'posicionContactoActualizar' y modificar sus datos
}

window.prepararContacto = (id) => {
  console.log("aqui tengo que preparar el contacto", id);
  //buscar la información del usuario para agregar al modal
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  console.log(contactoBuscado);
  //modificar el titulo de la ventana modal
  const tituloModal = document.querySelector(".modal-title");
  tituloModal.textContent = "Modificar Contacto";
  abrirModalContacto();
  //cargar datos en el formulario
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputTelefono.value = contactoBuscado.telefono;
  inputImagen.value = contactoBuscado.imagen;
  inputNotas.value = contactoBuscado.notas;
  //cambiamos la variable para editar
  creandoContacto = false;
  //guardar el id del contacto que quiero modificar
  idContacto = id;
};

window.verContacto = (id) =>{
  console.log(id);
  console.log(window.location)
  window.location.href = '/pages/detalleContacto.html?id='+id
}
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
// si creandoContacto = true voy a crear el contacto, si es false signifac que voy a editar el contacto
let creandoContacto = true;
let idContacto = null;

//manejadores de eventos
btnAgregarContacto.addEventListener("click", abrirModalContacto);
formularioCrearContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoContacto) {
    //el usuario completa el form y debo crear un objeto contacto
    crearContacto();
  } else {
    editarContacto();
  }
});

cargaDatosContacto();
