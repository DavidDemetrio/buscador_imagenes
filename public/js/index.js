const registrosPorPagina = 40;
let paginaActual = 1;
const formulario = document.querySelector('#formulario');

const mostrarMensajeAlerta = () => {
    const mensajeAlerta = document.createElement('DIV');

    mensajeAlerta.classList.add('bg-red-100', 'border', 'border-red-400', 'text-sm', 'text-red-700', 'msg-alert',
    'm-auto', 'mt-2', 'px-4', 'py-px', 'rounded', 'relative', 'animate__animated', 'animate__bounceIn');
    
    mensajeAlerta.style = 'width: 32rem';
    mensajeAlerta.role = 'alert';
    mensajeAlerta.innerHTML = `
        <strong class="font-bold">Opps!</strong>
        <span class="block sm:inline">Agrega un término de búsqueda.</span>
    `;
    const divBuscador = document.querySelector('.buscador');
    divBuscador.after(mensajeAlerta);
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
    const key = document.querySelector('#key-pixaby').value;
    const urlAPI = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(urlAPI)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
        })
}

window.onload = () => {
    formulario.addEventListener('submit', getImagenesAPI)
};