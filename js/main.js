import { Serie } from './serie.js';

let paginaActual = 1;
const seriesPorPagina = 6;
const contenedorSeries = document.getElementById("series");

document.addEventListener("DOMContentLoaded", () => {
  cargarSeries(paginaActual);
  document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
  document.getElementById("anterior").addEventListener("click", paginaAnterior);
});

async function cargarSeries(pagina) {
  contenedorSeries.innerHTML = "";

  const inicio = (pagina - 1) * seriesPorPagina + 1;

  for (let i = inicio; i < inicio + seriesPorPagina; i++) {
    const url = `https://api.tvmaze.com/shows/${i}`;

    try {
      const response = await fetch(url);
      const serieData = await response.json();

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

    } catch (error) {
      console.error(`Error al cargar la serie con id ${i}:`, error);
    }
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