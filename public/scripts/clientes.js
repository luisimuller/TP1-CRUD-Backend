document.addEventListener('DOMContentLoaded', () => {
  // MODAL AGREGAR
  const btnMostrarForm = document.getElementById('btnMostrarFormAgregar');
  const modalAgregar = document.getElementById('modalAgregarCliente');
  const formAgregar = document.getElementById('formAgregarCliente');
  const btnCancelar = document.getElementById('btnCancelarAgregar');
  
  if (btnMostrarForm && modalAgregar && formAgregar && btnCancelar) {
    btnMostrarForm.addEventListener('click', () => {
      modalAgregar.style.display = 'flex';
    });
    
    btnCancelar.addEventListener('click', () => {
      formAgregar.reset();
      modalAgregar.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    modalAgregar.addEventListener('click', (e) => {
      if (e.target === modalAgregar) {
        formAgregar.reset();
        modalAgregar.style.display = 'none';
      }
    });
  }

  // MODAL EDITAR
  const modalEditar = document.getElementById('modalEditarCliente');
  const formEditar = document.getElementById('formEditarCliente');
  const btnCancelarEditar = document.getElementById('btnCancelarEditar');
  
  if (btnCancelarEditar && modalEditar && formEditar) {
    btnCancelarEditar.addEventListener('click', () => {
      formEditar.reset();
      modalEditar.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    modalEditar.addEventListener('click', (e) => {
      if (e.target === modalEditar) {
        formEditar.reset();
        modalEditar.style.display = 'none';
      }
    });
  }

  // Enviar formulario para agregar cliente
  if (formAgregar) {
    formAgregar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formAgregar));
      
      try {
        const res = await fetch('/clientes/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (res.ok) {
          alert('Cliente agregado exitosamente');
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al agregar cliente');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  }

  // Enviar formulario para editar cliente
  if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formEditar));
      const id = data.id;
      
      // Remover el id del data object ya que no se debe enviar en el body
      delete data.id;
      
      try {
        const res = await fetch(`/clientes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (res.ok) {
          alert('Cliente actualizado exitosamente');
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al actualizar cliente');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  }

  // Botones de modificar
  document.querySelectorAll('.btn-modificar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.cliente-item');
      const id = li.getAttribute('data-id');
      
      try {
        const res = await fetch(`/clientes/${id}`);
        if (res.ok) {
          const cliente = await res.json();
          
          // Llenar el formulario de edición
          formEditar.querySelector('input[name="id"]').value = cliente._id;
          formEditar.querySelector('input[name="nombre"]').value = cliente.nombre;
          formEditar.querySelector('input[name="apellido"]').value = cliente.apellido;
          formEditar.querySelector('input[name="razonSocial"]').value = cliente.razonSocial;
          formEditar.querySelector('input[name="direccion"]').value = cliente.direccion || '';
          formEditar.querySelector('input[name="telefono"]').value = cliente.telefono || '';
          formEditar.querySelector('input[name="mail"]').value = cliente.mail || '';
          
          modalEditar.style.display = 'flex';
        } else {
          const error = await res.json();
          alert(error.message || 'Error al cargar datos del cliente');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  });

  // Eliminar cliente
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.cliente-item');
      const id = li.getAttribute('data-id');
      
      if (confirm('¿Seguro que deseas eliminar este cliente?')) {
        try {
          const res = await fetch(`/clientes/${id}`, { method: 'DELETE' });
          if (res.ok) {
            alert('Cliente eliminado exitosamente');
            location.reload();
          } else {
            const error = await res.json();
            alert(error.message || 'Error al eliminar cliente');
          }
        } catch (err) {
          alert('Error de red: ' + err.message);
        }
      }
    });
  });
});