document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-contacto");
  const erroresDiv = document.getElementById("errores");
  const resultadoDiv = document.getElementById("resultado");

  // Guardar el display original del formulario
  const displayOriginal = window.getComputedStyle(formulario).display;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturar valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Limpiar mensajes previos
    erroresDiv.innerHTML = "";
    resultadoDiv.innerHTML = "";

    const errores = [];

    // --- Validaciones ---
    if (nombre.length < 3) errores.push("El nombre debe tener al menos 3 caracteres.");
    if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email))
      errores.push("El email ingresado no es válido.");
    if (!/^[0-9]{10}$/.test(telefono))
      errores.push("El teléfono debe tener exactamente 10 dígitos numéricos.");
    if (mensaje.length === 0)
      errores.push("Por favor, escribí un mensaje.");
    else if (mensaje.length > 300)
      errores.push("El mensaje no puede superar los 300 caracteres.");

    // --- Mostrar errores ---
    if (errores.length > 0) {
      errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = `⚠️ ${error}`;
        p.style.color = "red";
        erroresDiv.appendChild(p);
      });
      return;
    }

    // --- Mostrar datos enviados ---
    const datos = document.createElement("div");
    datos.classList.add("resultado-datos");
    datos.innerHTML = `
      <h3>✅ Datos enviados correctamente</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
      <p><em>Este mensaje se ocultará automáticamente en unos segundos...</em></p>
    `;

    // Ocultar el formulario y mostrar el mensaje
    formulario.style.display = "none";
    resultadoDiv.appendChild(datos);

    // Restaurar el formulario tras 5 segundos
    setTimeout(() => {
      datos.remove();
      formulario.reset();
      formulario.style.display = displayOriginal; // 👈 vuelve al estilo original
    }, 5000);
  });
});
