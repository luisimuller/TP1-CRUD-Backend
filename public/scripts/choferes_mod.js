document.addEventListener('DOMContentLoaded', () => {
  // ...código existente...

  // --- MODIFICAR CHOFER ---
  const formEditar = document.getElementById('formEditarChofer');
  const btnCancelarEditar = document.getElementById('btnCancelarEditar');

  // Mostrar formulario de editar con datos actuales
  (() => {
    const modalEditar = document.getElementById('modalEditarChofer');
    const formEditar = document.getElementById('formEditarChofer');
    const btnCancelarEditar = document.getElementById('btnCancelarEditar');
    document.querySelectorAll('.btn-modificar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const li = e.target.closest('.chofer-item');
        const id = li.getAttribute('data-id');
        const nombre = li.querySelector('.chofer-nombre').textContent.replace('Nombre: ', '');
        const apellido = li.querySelector('.chofer-apellido').textContent.replace('Apellido: ', '');
        const licencia = li.querySelector('.chofer-licencia').textContent.replace('Licencia: ', '');
        const dni = li.getAttribute('data-dni');
        const telefono = li.getAttribute('data-telefono');
        formEditar.id.value = id;
        formEditar.nombre.value = nombre;
        formEditar.apellido.value = apellido;
        formEditar.licencia.value = licencia;
        formEditar.dni.value = dni;
        formEditar.telefono.value = telefono;
        if (modalEditar) modalEditar.style.display = 'flex';
      });
    });
    if (btnCancelarEditar && modalEditar && formEditar) {
      btnCancelarEditar.addEventListener('click', () => {
        formEditar.reset();
        modalEditar.style.display = 'none';
      });
    }
  })();

  // Cancelar edición
  if (btnCancelarEditar && formEditar) {
    btnCancelarEditar.addEventListener('click', () => {
      formEditar.reset();
      formEditar.style.display = 'none';
    });
  }

  // Enviar formulario de edición
  if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = formEditar.id.value;
      const data = Object.fromEntries(new FormData(formEditar));
      delete data.id;
      try {
        const res = await fetch(`/choferes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al modificar chofer');
        }
      } catch (err) {
        alert('Error de red');
      }
    });
  }
});
