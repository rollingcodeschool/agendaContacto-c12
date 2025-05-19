class Contacto{
    #id;
    #nombre;
    #apellido;
    #telefono;
    #email
    constructor(nombre, apellido, telefono, email){
        this.#id = crypto.randomUUID();
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#email= email
    }

    //agregar los get y set
}