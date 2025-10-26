document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const btnAgregar = document.getElementById("btnAgregarEnvio");
  const modalAgregar = document.getElementById("modalAgregarEnvio");
  const btnCancelarAgregar = document.getElementById("btnCancelarAgregar");
  const formAgregar = document.getElementById("formAgregarEnvio");

  const btnCerrarEditar = document.getElementById("btnCancelarEditar");
  const modalEditar = document.getElementById("modalEditarEnvio");
  const formEditar = document.getElementById("formEditarEnvio");

  const listaEnvios = document.getElementById("envio-list");

    // ---------- ABRIR MODAL AUTOMÁTICAMENTE SI LLEGA CON ?abrirModalAgregarEnvio=true ----------
  const params = new URLSearchParams(window.location.search);
  const abrirModal = params.get("abrirModalAgregarEnvio");

  if (abrirModal === "true") {
    const modal = document.getElementById("modalAgregarEnvio");
    if (modal) {
      modal.style.display = "flex";
      // Limpia el parámetro de la URL después de abrir el modal
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }


  // ---------- ABRIR/CERRAR MODALES ----------
  btnAgregar.addEventListener("click", () => {
    modalAgregar.style.display = "flex";
  });

  btnCancelarAgregar.addEventListener("click", () => {
    modalAgregar.style.display = "none";
    formAgregar.reset();
  });

  btnCerrarEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
    formEditar.reset();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalAgregar) modalAgregar.style.display = "none";
    if (e.target === modalEditar) modalEditar.style.display = "none";
  });

  // ---------- AGREGAR ENVÍO ----------
  formAgregar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formAgregar);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/envios/api/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Error al agregar envío");
      const nuevoEnvio = await res.json();
      location.reload(); // recarga la página para actualizar la lista
    } catch (err) {
      alert(err.message);
    }
  });

  // ---------- EDITAR ENVÍO ----------
  listaEnvios.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`/envios/api/${id}`);
        const envio = await res.json();

        // Llenar formulario de edición
        formEditar.id.value = envio._id;
        formEditar.idCliente.value = envio.idCliente?._id || "";
        formEditar.idVehiculo.value = envio.idVehiculo?._id || "";
        formEditar.idChofer.value = envio.idChofer?._id || "";
        formEditar.origen.value = envio.origen || "";
        formEditar.destino.value = envio.destino || "";
        formEditar.fechaEnvio.value = envio.fechaEnvio ? envio.fechaEnvio.split("T")[0] : "";
        formEditar.estado.value = envio.estado || "";
        formEditar.costo.value = envio.costo || "";

        modalEditar.style.display = "flex";
      } catch (err) {
        alert("Error al cargar envío para editar");
      }
    }
  });

formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = formEditar.id.value;
  const formData = new FormData(formEditar);
  const data = Object.fromEntries(formData.entries());

  // Convertir tipos correctamente
  if (data.costo) data.costo = parseFloat(data.costo);
  if (!data.fechaEnvio) delete data.fechaEnvio; // evita error de fecha vacía

  try {
    const res = await fetch(`/envios/api/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Error backend:", responseData);
      throw new Error(responseData.message || "Error al actualizar envío");
    }

    location.reload();
  } catch (err) {
    console.error("Error frontend:", err);
    alert(err.message);
  }
});


  // ---------- ELIMINAR ENVÍO ----------
  listaEnvios.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.dataset.id;
      if (!confirm("¿Seguro que quieres eliminar este envío?")) return;

      try {
        const res = await fetch(`/envios/api/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar envío");
        location.reload();
      } catch (err) {
        alert(err.message);
      }
    }
  });
});
