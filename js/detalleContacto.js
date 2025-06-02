//1- buscar el parametro de la url
console.log(window.location.search)

const parametroURL = new URLSearchParams(window.location.search)
console.log(parametroURL)
const id = parametroURL.get('id')
console.log(id)
//2- traer la agenda de contactos del localstorage

//3- buscar en la agenda cual son los datos del contacto que tiene el id recibido en la url

//4- dibujar el objeto en mi maquetado