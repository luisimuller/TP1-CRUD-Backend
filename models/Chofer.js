// models/Chofer.js

class Chofer {
  constructor(idChofer, nombre, apellido, dni, licencia, telefono) {
    this.idChofer = idChofer;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.licencia = licencia;
    this.telefono = telefono;
  }
}

module.exports = Chofer;
