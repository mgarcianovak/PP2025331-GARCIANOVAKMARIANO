import { Serie } from './serie.js';

let guardadas = [];
const clave = "seriesGuardadas";

document.addEventListener("DOMContentLoaded", () => {
  guardadas = JSON.parse(localStorage.getItem(clave)) || [];

  document.getElementById("ordenar-nombre").addEventListener("click", () => {
    guardadas.sort((a, b) => a.name.localeCompare(b.name));
    renderizar();
  });

  document.getElementById("ordenar-id").addEventListener("click", () => {
    guardadas.sort((a, b) => a.id - b.id);
    renderizar();
  });

  renderizar();
});

function renderizar() {
  const contenedor = document.getElementById("series");
  contenedor.innerHTML = "";

  guardadas.forEach(data => {
    const serie = new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    const card = serie.createHtmlElement();
    contenedor.appendChild(card);
  });
}
