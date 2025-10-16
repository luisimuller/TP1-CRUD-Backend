document.addEventListener('DOMContentLoaded', () => {
  // MODAL AGREGAR
  const btnMostrarForm = document.getElementById('btnMostrarFormAgregar');
  const modalAgregar = document.getElementById('modalAgregarVehiculo');
  const formAgregar = document.getElementById('formAgregarVehiculo');
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
  const modalEditar = document.getElementById('modalEditarVehiculo');
  const formEditar = document.getElementById('formEditarVehiculo');
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

  // Enviar formulario para agregar vehículo
  if (formAgregar) {
    formAgregar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formAgregar));
      
      // Convertir capacidad a número
      data.capacidad = parseInt(data.capacidad);
      
      try {
        const res = await fetch('/vehiculos/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (res.ok) {
          alert('Vehículo agregado exitosamente');
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al agregar vehículo');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  }

  // Enviar formulario para editar vehículo
  if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formEditar));
      const id = data.id;
      
      // Remover el id del data object y convertir capacidad a número
      delete data.id;
      data.capacidad = parseInt(data.capacidad);
      
      try {
        const res = await fetch(`/vehiculos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (res.ok) {
          alert('Vehículo actualizado exitosamente');
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al actualizar vehículo');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  }

  // Botones de modificar
  document.querySelectorAll('.btn-modificar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.vehiculo-item');
      const id = li.getAttribute('data-id');
      
      try {
        const res = await fetch(`/vehiculos/${id}`);
        if (res.ok) {
          const vehiculo = await res.json();
          
          // Llenar el formulario de edición
          formEditar.querySelector('input[name="id"]').value = vehiculo._id;
          formEditar.querySelector('input[name="patente"]').value = vehiculo.patente;
          formEditar.querySelector('select[name="tipo"]').value = vehiculo.tipo;
          formEditar.querySelector('select[name="estado"]').value = vehiculo.estado;
          formEditar.querySelector('input[name="capacidad"]').value = vehiculo.capacidad;
          
          modalEditar.style.display = 'flex';
        } else {
          const error = await res.json();
          alert(error.message || 'Error al cargar datos del vehículo');
        }
      } catch (err) {
        alert('Error de red: ' + err.message);
      }
    });
  });

  // Eliminar vehículo
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.vehiculo-item');
      const id = li.getAttribute('data-id');
      const patente = li.querySelector('.vehiculo-patente').textContent.replace('Patente: ', '');
      
      if (confirm(`¿Seguro que deseas eliminar el vehículo ${patente}?`)) {
        try {
          const res = await fetch(`/vehiculos/${id}`, { method: 'DELETE' });
          if (res.ok) {
            alert('Vehículo eliminado exitosamente');
            location.reload();
          } else {
            const error = await res.json();
            alert(error.message || 'Error al eliminar vehículo');
          }
        } catch (err) {
          alert('Error de red: ' + err.message);
        }
      }
    });
  });

  // Funcionalidad de filtros por estado (opcional)
  const vehiculoItems = document.querySelectorAll('.vehiculo-item');
  
  // Función para filtrar por estado
  window.filtrarPorEstado = function(estado) {
    vehiculoItems.forEach(item => {
      if (estado === 'todos' || item.classList.contains(`estado-${estado}`)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // Validación de patente en tiempo real
  const patenteInputs = document.querySelectorAll('input[name="patente"]');
  patenteInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.toUpperCase();
      // Formato básico ABC-123 o ABC123
      value = value.replace(/[^A-Z0-9]/g, '');
      if (value.length > 3 && value.length <= 6) {
        value = value.substring(0, 3) + '-' + value.substring(3);
      }
      e.target.value = value;
    });
  });

  // Validación de capacidad
  const capacidadInputs = document.querySelectorAll('input[name="capacidad"]');
  capacidadInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      if (value < 1) {
        e.target.value = 1;
      }
      if (value > 50000) {
        e.target.value = 50000;
      }
    });
  });
});