# TP1-CRUD-Backend
## Clases
A continuación se muestrans las clases para nuestro proyecto y su relación:

**Cliente**

- id (PK)
- nombre
- apellido
- razonSocial
- direccion
- telefono
- mail

**Vehiculos**

- id (PK)
- patente
- tipo (camión, furgón, moto, etc.)
- capacidad
- estado (activo, en mantenimiento, dado de baja)

**Choferes**

- id (PK)
- nombre
- apellido
- dni
- licencia
- telefono

**Envios**

- idEnvio (PK)
- idCliente (FK → Cliente)
- origen
- destino
- fechaEnvio
- estado
- costo
- idVehiculo (FK → Vehiculo)
- idChofer (FK → Chofer)

**Facturas**

- id (PK)
- idEnvio (FK → Envio)
- fecha
- monto
- metodoPago

## Endpoints a probar
### Envíos

***Listar todos los envíos (GET)***
```
GET http://localhost:3000/envios
```

***Crear un nuevo envío (POST)***
```
POST http://localhost:3000/envios/agregar
```
```
{
  "idCliente": 1,
  "idVehiculo": 2,
  "idChofer": 1,
  "origen": "La Plata",
  "destino": "Mar del Plata",
  "fechaEnvio": "2024-02-01",
  "estado": "pendiente",
  "costo": 2000
}
```

***Obtener un envío por ID (GET)***

```
GET http://localhost:3000/envios/3
```

***Actualizar un envío completo (PUT)***
```
PUT http://localhost:3000/envios/3
```
```
{
  "idCliente": 1,
  "idVehiculo": 2,
  "idChofer": 1,
  "origen": "La Plata",
  "destino": "Mar del Plata",
  "fechaEnvio": "2024-02-02",
  "estado": "en tránsito",
  "costo": 2500
}
```

***Actualizar un envío parcialmente (PATCH)***
```
PATCH http://localhost:3000/envios/3
```
```
{
  "estado": "entregado"
}
```

***Eliminar un envío (DELETE)***
```
DELETE http://localhost:3000/envios/3
```

Resultado esperado:
```
{
  "message": "Envío eliminado",
  "eliminado": {
    "id": 3,
    "idCliente": 1,
    "idVehiculo": 2,
    "idChofer": 1,
    "origen": "La Plata",
    "destino": "Mar del Plata",
    "fechaEnvio": "2024-02-02",
    "estado": "en tránsito",
    "costo": 2500
  }
}
```
