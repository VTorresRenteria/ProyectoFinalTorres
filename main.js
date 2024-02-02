let listado = document.getElementById("listado");

const traerDatos = async () => {
    try {
        const response = await fetch("https://valorant-api.com/v1/bundles?language=es-MX");
        const data = await response.json();

        data.data.forEach((skin) => {
            listado.innerHTML += `
            <div class="contenedor_skins">
                <h3>${skin.displayName}</h3>
                <img src="${skin.displayIcon}">
                </div>
            `;

        });
    } catch (error) {
        console.log(error);
    }
};

traerDatos();

// fetch("https://valorant-api.com/v1/bundles")
//     .then((response) => response.json())
//     .then((response) => {
//         console.log(response);

//     });

//https://valorant-api.com/v1/weapons/skins?language=es-MX
//<button id="botonAgregar${skin.uuid}" class="boton_agregar">Agregar a favoritos</button>