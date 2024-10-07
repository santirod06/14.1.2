
document.getElementById('btnBuscar').addEventListener('click', () => {    // añadimos el evento cuando se hace click en buscar
    const busqueda = document.getElementById('inputBuscar').value;
    if (busqueda) {
        buscarImagenes(busqueda); // si hay informacion en el campo de busqueda va a la funcion de debajo
    }
});

function buscarImagenes(busqueda) {  // 
    const apiUrl = `https://images-api.nasa.gov/search?q=${busqueda}&media_type=image`; // concatenamos busqueda (la palabra que puso el usuario para buscar)

    fetch(apiUrl) // hacemos la solicitud al servidor con fetch
        .then(response => response.json()) // lo convertimos en un formato json
        .then(data => mostrarImagenes(data.collection.items)) // llamamos la funcion mostrarImagenes
        .catch(error => console.error('Error al buscar imágenes:', error));
}



function mostrarImagenes(items) {
    const contenedor = document.getElementById('contenedor'); // selecciona el elemento del HTML con id contenedor
    contenedor.innerHTML = ''; // Limpiar el contenedor de imágenes anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No encontre nada bro</p>';
        return;
    }



    items.forEach(item => { // iteramos sobre cada uno de los elementos
        const imagenUrl = item.links[0].href;
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description || 'Sin descripción';
        const fecha = item.data[0].date_created;

        const card = `
            <div class="card mb-4" style="width: 18rem;">
                <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${descripcion}</p>
                    <p class="card-text"><small class="text-muted">${fecha}</small></p>
                </div>
            </div>
        `;
        contenedor.innerHTML += card;
    });
}
