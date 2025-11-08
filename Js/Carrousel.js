document.addEventListener("DOMContentLoaded", () => {
  
  const imagenes = [
    "../Img/carrousel_img1.jpeg",
    "../Img/carrousel_img2.jpeg",
    "../Img/carrousel_img3.png",
    "../Img/carrousel_img4.png"
  ];

  const imgElemento = document.getElementById("carousel-image");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const carrusel = document.querySelector(".carousel");

 
  
  imagenes.forEach((ruta, i) => {
    fetch(ruta, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) console.warn(`Imagen ${i} -> ${ruta} devolvió ${res.status}`);
      })
      .catch(err => console.warn(`Error comprobando imagen ${ruta}:`, err));
  });

  let indiceActual = 0;
  let intervalo = null;

  function mostrarImagen() {
    imgElemento.style.transition = "opacity .18s ease";
    imgElemento.style.opacity = 0;

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

  btnNext.addEventListener("click", () => {
    siguienteImagen();
    reiniciarIntervalo();
  });

  btnPrev.addEventListener("click", () => {
    anteriorImagen();
    reiniciarIntervalo();
  });

  function iniciarIntervalo() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(siguienteImagen, 4000);
  }

  function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
  }

  carrusel.addEventListener("mouseenter", () => clearInterval(intervalo));
  carrusel.addEventListener("mouseleave", () => iniciarIntervalo());

  mostrarImagen();
  iniciarIntervalo();

  console.info("Carrusel inicializado. Imágenes:", imagenes.length);
});
