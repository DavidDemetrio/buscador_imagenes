const formulario = document.querySelector('#formulario');

const clickCerrarAlerta = () => {
    
}

const mostrarMensajeAlerta = () => {
    const mensajeAlerta = document.createElement('DIV');

    mensajeAlerta.classList.add('bg-red-100', 'border', 'border-red-400', 'text-sm', 'text-red-700', 'msg-alert',
    'm-auto', 'mt-2', 'px-4', 'py-px', 'rounded', 'relative', 'animate__animated', 'animate__bounceIn');
    
    mensajeAlerta.style = 'width: 32rem';
    mensajeAlerta.role = 'alert';
    mensajeAlerta.innerHTML = `
        <strong class="font-bold">Opps!</strong>
        <span class="block sm:inline">Agrega un término de búsqueda.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="
                        M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1
                        1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2
                        1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z
                    "
                />
            </svg>
        </span>
    `;
    const divBuscador = document.querySelector('.buscador');
    divBuscador.after(mensajeAlerta);
    clickCerrarAlerta();
}

const validarFormulario = e => {
    e.preventDefault();
    const busqueda = document.querySelector('#termino').value;
    const existe_mensajeAlerta = document.querySelector('.msg-alert');
    // Si en el campo de búsqueda no se ha escrito nada, muestra un mensaje de alerta
    if (busqueda.trim() === '') {
        // Si el mensahe de alerta existe_mensajeAlerta = false, entonces crea el mensaje.
        // Esta línea de códdigo permite que el mensaje de alerta sea creado una sola vez a la vez.
        existe_mensajeAlerta ?? mostrarMensajeAlerta();
        return;
    }
    /**
     * Las siguientes líneas de codigo se ejecutan, en caso de que el usuario sí haya escrito algo en el campo de búsqueda
    */
    // Elimina cualquier mensaje de alerta
    if (existe_mensajeAlerta) existe_mensajeAlerta.remove();
}

window.onload = () => { 
    formulario.addEventListener('submit', validarFormulario);
}