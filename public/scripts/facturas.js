// Archivo: public/scripts/facturas_mod.js
document.addEventListener('DOMContentLoaded', () => {

  // ------------------ MODAL AGREGAR FACTURA ------------------
  const btnMostrarFormAgregar = document.getElementById('btnMostrarFormAgregar');
  const modalAgregar = document.getElementById('modalAgregarFactura');
  const formAgregar = document.getElementById('formAgregarFactura');
  const btnCancelarAgregar = document.getElementById('btnCancelarAgregar');

  if (btnMostrarFormAgregar && modalAgregar && formAgregar && btnCancelarAgregar) {
    btnMostrarFormAgregar.addEventListener('click', () => modalAgregar.style.display = 'flex');

    btnCancelarAgregar.addEventListener('click', () => {
      formAgregar.reset();
      modalAgregar.style.display = 'none';
    });
  }

  if (formAgregar) {
    formAgregar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formAgregar));
      // Convertir valores numéricos
      data.idEnvio = data.idEnvio;
      data.monto = parseFloat(data.monto);

      try {
        const res = await fetch('/facturas/api/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) location.reload();
        else {
          const error = await res.json();
          alert(error.message || 'Error al agregar factura');
        }
      } catch (err) {
        alert('Error de red');
        console.error(err);
      }
    });
  }

  // ------------------ MODAL EDITAR FACTURA ------------------
  const formEditar = document.getElementById('formEditarFactura');
  const modalEditar = document.getElementById('modalEditarFactura');
  const btnCancelarEditar = document.getElementById('btnCancelarEditar');

  if (formEditar && modalEditar && btnCancelarEditar) {

    // Abrir modal con datos actuales
    document.querySelectorAll('.btn-modificar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const li = e.target.closest('.factura-item');
        const id = li.getAttribute('data-id');
        const idEnvio = parseInt(li.querySelector('.factura-idEnvio').textContent.replace('ID Envío: ', ''));
        const fecha = li.querySelector('.factura-fecha').textContent.replace('Fecha: ', '');
        const monto = parseFloat(li.querySelector('.factura-monto').textContent.replace('Monto: $', ''));
        const metodoPago = li.querySelector('.factura-metodoPago').textContent.replace('Método de Pago: ', '');

        formEditar.id.value = envio._id;
        formEditar.idEnvio.value = idEnvio;
        formEditar.fecha.value = fecha;
        formEditar.monto.value = monto;
        formEditar.metodoPago.value = metodoPago;

        modalEditar.style.display = 'flex';
      });
    });

    // Cerrar modal
    btnCancelarEditar.addEventListener('click', () => {
      formEditar.reset();
      modalEditar.style.display = 'none';
    });

    // ------------------ MODIFICAR FACTURA (PUT) ------------------
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = formEditar.id.value;
      const data = {
        idEnvio: parseInt(formEditar.idEnvio.value),
        fecha: formEditar.fecha.value,
        monto: parseFloat(formEditar.monto.value),
        metodoPago: formEditar.metodoPago.value
      };

      try {
        const res = await fetch(`/facturas/api/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) location.reload();
        else {
          const error = await res.json();
          alert(error.message || 'Error al modificar factura');
        }
      } catch (err) {
        alert('Error de red');
        console.error(err);
      }
    });

    // ------------------ MODIFICAR FACTURA PARCIAL (PATCH) ------------------
    document.querySelectorAll('.btn-patch').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const li = e.target.closest('.factura-item');
        const id = li.getAttribute('data-id');
        const newMonto = prompt('Ingrese el nuevo monto:');
        if (!newMonto) return;

        try {
          const res = await fetch(`/facturas/api/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ monto: parseFloat(newMonto) })
          });

          if (res.ok) location.reload();
          else {
            const error = await res.json();
            alert(error.message || 'Error al actualizar monto');
          }
        } catch (err) {
          alert('Error de red');
          console.error(err);
        }
      });
    });
  }

  // ------------------ ELIMINAR FACTURA ------------------
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.factura-item');
      const id = li.getAttribute('data-id');

      if (confirm('¿Seguro que deseas eliminar esta factura?')) {
        try {
          const res = await fetch(`/facturas/api/${id}`, { method: 'DELETE' });
          if (res.ok) location.reload();
          else {
            const error = await res.json();
            alert(error.message || 'Error al eliminar factura');
          }
        } catch (err) {
          alert('Error de red');
          console.error(err);
        }
      }
    });
  });

});

