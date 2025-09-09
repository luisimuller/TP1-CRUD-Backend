# TP1-CRUD-Backend
## Clases
A continuación se muestrans las posibles clases para nuestro proyecto:

**Cliente**
- idCliente (PK)
- nombre
- apellido
- razonSocial
- direccion
- telefono
- mail
**Envio**
- idEnvio (PK)
- idCliente (FK → Cliente)
- origen
- destino
- fechaEnvio
- estado
- costo
- idVehiculo (FK → Vehiculo)
- idChofer (FK → Chofer)
**Vehiculo**
- idVehiculo (PK)
- patente
- tipo (camión, furgón, moto, etc.)
- capacidad
- estado (activo, en mantenimiento, dado de baja)
**Chofer**
- idChofer (PK)
- nombre
- apellido
- dni
- licencia
- telefono
**Factura**
- idFactura (PK)
- idEnvio (FK → Envio)
- fecha
- monto
- metodoPago
## Endpoints a probar
### Envíos

**Listar todos los envíos (GET)**
```
GET http://localhost:3000/envios
```

**Crear un nuevo envío (POST)**
```
GET http://localhost:3000/envios/agregar
```
```
{
  "id": 3,
  "cliente": "TransLog",
  "origen": "La Plata",
  "destino": "Mar del Plata",
  "estado": "pendiente"
}
```

**Obtener un envío por ID (GET)**
```
GET http://localhost:3000/envios/3
```

**Actualizar un envío completo (PUT)**
```
PUT http://localhost:3000/envios/3
```
```
{
  "cliente": "TransLog",
  "origen": "La Plata",
  "destino": "Mar del Plata",
  "estado": "en tránsito"
}
```

**Actualizar envío parcialmente (PATCH)**
```
PATCH http://localhost:3000/envios/2
```
```
{
  "estado": "entregado"
}
```

**Eliminar envío (DELETE)**
```
DELETE http://localhost:3000/envios/3
```
Resultado esperado:
```
{
  "message": "Envío eliminado",
  "eliminado": {
    "id": 3,
    "cliente": "TransLog",
    "origen": "La Plata",
    "destino": "Mar del Plata",
    "estado": "en tránsito"
  }
}
```