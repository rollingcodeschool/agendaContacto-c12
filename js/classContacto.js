export default class Contacto{
    #id;
    #nombre;
    #apellido;
    #telefono;
    #email;
    #imagen;
    #notas;
    constructor(nombre, apellido, telefono, email, imagen, notas){
        this.#id = crypto.randomUUID(); 
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#email= email;
        this.#imagen = imagen;
        this.#notas = notas;
    }
    // Getters
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    get telefono() {
        return this.#telefono;
    }

    get email() {
        return this.#email;
    }

    get imagen() {
        return this.#imagen;
    }

    get notas() {
        return this.#notas;
    }

    // Setters
    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }

    set apellido(nuevoApellido) {
        this.#apellido = nuevoApellido;
    }

    set telefono(nuevoTelefono) {
        this.#telefono = nuevoTelefono;
    }

    set email(nuevoEmail) {
        this.#email = nuevoEmail;
    }

    set imagen(nuevaImagen) {
        this.#imagen = nuevaImagen;
    }

    set notas(nuevasNotas) {
        this.#notas = nuevasNotas;
    }
    //metodo para stringify
    toJSON(){
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            telefono: this.telefono,
            notas: this.notas,
            imagen: this.imagen
        }
    }
}
