document.addEventListener('DOMContentLoaded', () => {
  // MODAL AGREGAR
  const btnMostrarForm = document.getElementById('btnMostrarFormAgregar');
  const modalAgregar = document.getElementById('modalAgregarChofer');
  const formAgregar = document.getElementById('formAgregarChofer');
  const btnCancelar = document.getElementById('btnCancelarAgregar');
  if (btnMostrarForm && modalAgregar && formAgregar && btnCancelar) {
    btnMostrarForm.addEventListener('click', () => {
      modalAgregar.style.display = 'flex';
    });
    btnCancelar.addEventListener('click', () => {
      formAgregar.reset();
      modalAgregar.style.display = 'none';
    });
  }

  // Enviar formulario para agregar chofer
  if (formAgregar) {
    formAgregar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formAgregar));
      try {
        const res = await fetch('/choferes/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          location.reload();
        } else {
          const error = await res.json();
          alert(error.message || 'Error al agregar chofer');
        }
      } catch (err) {
        alert('Error de red');
      }
    });
  }

  // Eliminar chofer
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('.chofer-item');
      const id = li.getAttribute('data-id');
      if (confirm('¿Seguro que deseas eliminar este chofer?')) {
        try {
          const res = await fetch(`/choferes/${id}`, { method: 'DELETE' });
          if (res.ok) {
            location.reload();
          } else {
            const error = await res.json();
            alert(error.message || 'Error al eliminar chofer');
          }
        } catch (err) {
          alert('Error de red');
        }
      }
    });
  });
});
