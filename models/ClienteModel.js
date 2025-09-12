// models/Cliente.js

class Cliente {
  constructor(idCliente, nombre, apellido, razonSocial, direccion, telefono, mail) {
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.razonSocial = razonSocial;
    this.direccion = direccion;
    this.telefono = telefono;
    this.mail = mail;
  }
}

module.exports = Cliente;
