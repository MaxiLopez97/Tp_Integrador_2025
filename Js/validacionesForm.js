document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-contacto");
  const erroresDiv = document.getElementById("errores");
  const resultadoDiv = document.getElementById("resultado");

  if (!formulario || !erroresDiv || !resultadoDiv) {
    console.error("Faltan elementos del formulario en el HTML.");
    return;
  }

  const displayOriginal = window.getComputedStyle(formulario).display;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    erroresDiv.innerHTML = "";
    resultadoDiv.innerHTML = "";

    const errores = [];

    if (nombre.length < 3) errores.push("El nombre debe tener al menos 3 caracteres.");
    if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email))
      errores.push("El email ingresado no es válido.");
    if (!/^[0-9]{10}$/.test(telefono))
      errores.push("El teléfono debe tener exactamente 10 dígitos numéricos.");
    if (mensaje.length === 0)
      errores.push("Por favor, escribí un mensaje.");
    else if (mensaje.length > 300)
      errores.push("El mensaje no puede superar los 300 caracteres.");

    if (errores.length > 0) {
      erroresDiv.innerHTML = errores.map(e => `<p style="color:red;">⚠️ ${e}</p>`).join("");
      return;
    }

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

    formulario.style.display = "none";
    resultadoDiv.appendChild(datos);

    setTimeout(() => {
      datos.remove();
      formulario.reset();
      formulario.style.display = displayOriginal;
    }, 5000);
  });
});
