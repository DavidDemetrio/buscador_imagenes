const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const REGISTROS_POR_PAGINA = 40;
let paginaActual = 1;
let totalPaginas = 0;

const mostrarMensajeAlerta = () => {
    const mensajeAlerta = document.createElement('DIV');

    mensajeAlerta.classList.add('bg-red-100', 'border', 'border-red-400', 'text-sm', 'text-red-700', 'msg-alert',
    'm-auto', 'mt-2', 'px-4', 'py-px', 'rounded', 'relative', 'animate__animated', 'animate__bounceIn');
    
    mensajeAlerta.style = 'width: 18rem';
    mensajeAlerta.role = 'alert';
    mensajeAlerta.innerHTML = `
        <strong class="font-bold">Opps!</strong>
        <span class="block sm:inline">Agrega un término de búsqueda.</span>
    `;
    const divBuscador = document.querySelector('.buscador');
    divBuscador.after(mensajeAlerta);
    setTimeout(() => {
        mensajeAlerta.remove();
    }, 2500);
}

const calcularPaginas = total => {
    return parseInt(Math.ceil(total / REGISTROS_POR_PAGINA));
}

const buscarImagenes = () => {
    const key = document.querySelector('#key-pixaby').value;
    const busqueda = document.querySelector('#termino').value;
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${REGISTROS_POR_PAGINA}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado_API => {
            if (resultado_API.total === 0) {
                resultado.innerHTML = `
                    <lottie-player
                        src="../public/images/96526-search-not-found.json"
                        autoplay
                        loop
                        style="width: 400px; margin: auto;"
                    ></lottie-player>
                `;
                paginacionDiv.style.display = "none";
                return;
            }
            paginacionDiv.style.display = "block";
            totalPaginas = calcularPaginas(resultado_API.totalHits);
            mostrarImagenes(resultado_API.hits);
        })
}

function *crearPaginador(total) {
    for (let i = 1; i <= total; i++ ) {
        yield i;
    }
}

const imprimirPaginador = () => {
    const iterador = crearPaginador(totalPaginas);
    while (true) {
        const { value, done } = iterador.next();
        if (done) return;
        // Caso contrario, genera un botón por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-transparent', 'shadow-md', 'hover:bg-blue-500', 'text-blue-700', 'font-semibold',
        'hover:text-white', 'py-1', 'px-4', 'mr-2', 'mb-4', 'border', 'border-blue-400', 'hover:border-transparent', 'rounded');
        boton.onclick = () => {
            boton.classList
            paginaActual = value;
            buscarImagenes();
        }
        paginacionDiv.appendChild(boton);
    }
}

const mostrarImagenes = imagenes => {
    // Limpiar el contenedor donde se muestran las imágenes de registros anteriores
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // Iterar sobre el arreglo de imágnes y construir el HTML
    imagenes.forEach(imagen => {
        const { webformatURL, likes, views, largeImageURL } = imagen;
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${webformatURL}">

                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me Gusta </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Veces Vista </span> </p>

                        <a
                            class="block w-full bg-blue-800 hover:bg-blue-700 uppercase font-bold text-center rounded mt-5 p-1 text-white"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer" 
                        >Ver Imagen</a>
                    </div>
                </div>
            </div>
        `;
    });
    // Limpiar el paginador previo
    while(paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild)
    }
    // Generamos el nuevo HTML
    imprimirPaginador();
}

const getImagenesAPI = e => {
    e.preventDefault();
    const busqueda = document.querySelector('#termino').value;
    const existe_mensajeAlerta = document.querySelector('.msg-alert');
    // Si en el campo de búsqueda no se ha escrito nada, muestra un mensaje de alerta
    if (busqueda.trim() === '') {
        if (!existe_mensajeAlerta) mostrarMensajeAlerta();
        return;
    }
    /**
     * Las siguientes líneas de codigo se ejecutan, en caso de que el usuario sí haya escrito algo en el campo de búsqueda
    */
    // Elimina cualquier mensaje de alerta
    if (existe_mensajeAlerta) existe_mensajeAlerta.remove();
    buscarImagenes();
}

window.onload = () => {
    formulario.addEventListener('submit', getImagenesAPI)
};