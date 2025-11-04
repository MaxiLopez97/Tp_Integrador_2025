document.addEventListener("DOMContentLoaded", () => {
  // Array con las rutas de las imágenes
  const imagenes = [
    "./img/carousel/carousel_img1.jpeg",
    "./img/carousel/img1.jpeg",
    "./img/carousel/img2.png",
    "./img/carousel/img3.png"
  ];

  // Selectores
  const imgElemento = document.getElementById("carousel-image");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const carrusel = document.querySelector(".carousel");

  // Comprobaciones básicas
  if (!imgElemento) return console.error("Error: No se encontró #carousel-image en el DOM.");
  if (!btnPrev) return console.error("Error: No se encontró #prev en el DOM.");
  if (!btnNext) return console.error("Error: No se encontró #next en el DOM.");
  if (!carrusel) return console.error("Error: No se encontró el contenedor .carousel en el DOM.");
  if (!Array.isArray(imagenes) || imagenes.length === 0) return console.error("Error: El array 'imagenes' está vacío o no es un array.");

  let indiceActual = 0;
  let intervalo = null;

  // Función para mostrar imagen con fade
  function mostrarImagen() {
    imgElemento.style.opacity = 0;
    // corto delay para ver el fade-out
    setTimeout(() => {
      imgElemento.src = imagenes[indiceActual];
      imgElemento.alt = `Imagen ${indiceActual + 1} de ${imagenes.length}`;
      imgElemento.style.opacity = 1;
    }, 180);
  }

  function siguienteImagen() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    mostrarImagen();
  }

  function anteriorImagen() {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    mostrarImagen();
  }

  // Eventos de click
  btnNext.addEventListener("click", () => {
    siguienteImagen();
    reiniciarIntervalo();
  });

  btnPrev.addEventListener("click", () => {
    anteriorImagen();
    reiniciarIntervalo();
  });

  // Autoavance cada 4s
  function iniciarIntervalo() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(siguienteImagen, 4000);
  }

  function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
  }

  // Pausar/reanudar en hover (útil en desktop)
  carrusel.addEventListener("mouseenter", () => clearInterval(intervalo));
  carrusel.addEventListener("mouseleave", () => iniciarIntervalo());

  // Mostrar la primera imagen (por si src inicial no coincide)
  mostrarImagen();
  iniciarIntervalo();

  // Mensaje de estado en consola (útil para debugging)
  console.info("Carrusel inicializado. Imágenes:", imagenes.length);
});
