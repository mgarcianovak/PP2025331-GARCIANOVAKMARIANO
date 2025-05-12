import { Serie } from './serie.js';

let paginaActual = 1;
const seriesPorPagina = 6;
const contenedorSeries = document.getElementById("series");

document.addEventListener("DOMContentLoaded", () => {
  cargarSeries(paginaActual);
  document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
  document.getElementById("anterior").addEventListener("click", paginaAnterior);
});

function cargarSeries(pagina) {
  contenedorSeries.innerHTML = "";

  const inicio = (pagina - 1) * seriesPorPagina + 1;

  function cargarUnaSerie(id) {
    const url = `https://api.tvmaze.com/shows/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(serieData => {
        const serie = new Serie(
          serieData.id,
          serieData.url,
          serieData.name,
          serieData.language,
          serieData.genres,
          serieData.image?.medium
        );

        const htmlElement = serie.createHtmlElement();
        contenedorSeries.appendChild(htmlElement);
      })
      .catch(error => {
        console.error(`Error al cargar la serie con id ${id}:`, error);
      });
  }

  for (let i = inicio; i < inicio + seriesPorPagina; i++) {
    cargarUnaSerie(i);
  }
}


function paginaSiguiente() {
  paginaActual++;
  cargarSeries(paginaActual);
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    cargarSeries(paginaActual);
  }
}