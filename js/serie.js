export class Serie {
    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    createHtmlElement() {
        const div = document.createElement("div");
        div.className = "card h-100 shadow-sm border-0";

        const img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;
        img.className = "card-img-top";
        img.style.cursor = "pointer";
        img.addEventListener("click", () => window.open(this.url, "_blank"));

        const body = document.createElement("div");
        body.className = "card-body d-flex flex-column justify-content-between";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = this.name;

        const lang = document.createElement("p");
        lang.className = "card-text mb-1";
        lang.textContent = `Idioma: ${this.language}`;

        const genres = document.createElement("p");
        genres.className = "card-text";
        genres.textContent = `Géneros: ${this.genres.join(", ")}`;

        body.appendChild(title);
        body.appendChild(lang);
        body.appendChild(genres);

        if (!window.location.href.includes("guardados.html")) {
            const boton = document.createElement("button");
            boton.textContent = "Guardar";
            boton.className = "btn btn-primary mt-2";
            boton.addEventListener("click", () => Serie.guardarSerie(this));
            body.appendChild(boton);
        }

        div.appendChild(img);
        div.appendChild(body);

        return div;
    }

    static guardarSerie(serie) {
        const clave = "seriesGuardadas";
        let guardadas = JSON.parse(localStorage.getItem(clave)) || [];
        if (!guardadas.some(s => s.id === serie.id)) {
            guardadas.push(serie);
            localStorage.setItem(clave, JSON.stringify(guardadas));
            alert("Serie guardada exitosamente.");
        } else {
            alert("La serie ya esta guardada.");
        }
    }
}
