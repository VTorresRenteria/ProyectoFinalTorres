let skinsFav = JSON.parse(localStorage.getItem('skinsFav')) || [];
let listado = document.getElementById("listado");
const mostradorFav = document.getElementById('mostrador-fav');


const traerDatos = async () => {
    try {
        const response = await fetch("https://valorant-api.com/v1/bundles?language=es-MX");
        const data = await response.json();

        data.data.forEach((skin) => {
            let div = document.createElement("div");
            div.innerHTML = `
                <h3>${skin.displayName}</h3>
                <img src="${skin.displayIcon}">
                <button class="boton_agregar" id="botonAgregar${skin.uuid}">Agregar a favoritos</button>
            `;
            listado.append(div);

            let botonAgregar = document.getElementById(`botonAgregar${skin.uuid}`);
            botonAgregar.addEventListener("click", () => agregarFavorito(skin));
        });
    } catch (error) {
        console.log(error);
    }
};

function agregarFavorito(skin) {
    if (!skinsFav.some((favSkin) => favSkin.uuid === skin.uuid)) {
        skinsFav.push(skin);
        localStorage.setItem('skinsFav', JSON.stringify(skinsFav));
        mostrarSkinsFavoritas();
    }
}

function quitarFavorito(id) {
    skinsFav = skinsFav.filter((favItem) => favItem.uuid !== id);
    localStorage.setItem('skinsFav', JSON.stringify(skinsFav));
    mostrarSkinsFavoritas();
}

function mostrarSkinsFavoritas() {
    mostradorFav.innerHTML = '';

    skinsFav.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${item.displayName}</h2>
            <img src="${item.displayIcon}">
            <button id="botonQuitar${item.uuid}">Quitar de favoritos</button>
        `;
        mostradorFav.appendChild(div);

        let botonQuitar = document.getElementById(`botonQuitar${item.uuid}`);
        botonQuitar.addEventListener("click", () => quitarFavorito(item.uuid));
    });
}

traerDatos();
mostrarSkinsFavoritas();

// fetch("https://valorant-api.com/v1/bundles")
//     .then((response) => response.json())
//     .then((response) => {
//         console.log(response);

//     });

// https://valorant-api.com/v1/weapons/skins?language=es-MX
// <button id="botonAgregar${skin.uuid}" class="boton_agregar">Agregar a favoritos</button>