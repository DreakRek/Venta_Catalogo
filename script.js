function generarNumeroOrden() {
    const numeroOrden = Math.floor(Math.random() * 10000); // Genera un n�mero aleatorio entre 0 y 9999
    return numeroOrden;
}

document.addEventListener('DOMContentLoaded', function () {
    const botonesComprar = document.querySelectorAll('.boton-comprar');
    const modalBackground = document.getElementById('modal-background');
    const modal = document.getElementById('modal');
    const botonCerrarModal = document.getElementById('close-modal');
    const compraForm = document.getElementById('compra-form');
    const facturaContainer = document.getElementById('factura-container');
    const cerrarFacturaBtn = document.getElementById('cerrar-factura-btn');

    // Agrega un controlador de clic al botón/icono de cierre
    botonCerrarModal.addEventListener('click', () => {
        // Oculta el fondo oscuro y el modal al hacer clic en el botón/icono de cierre
        modalBackground.style.display = 'none';
        modal.style.display = 'none';
    });
    // modalBackground.style.display = 'none';
    // modal.style.display = 'none';
    // Agrega un controlador de clic a cada botón
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtén los datos del producto desde el atributo "data"
            const nombre = boton.getAttribute('data-nombre');
            const precio = boton.getAttribute('data-precio');
            const imagen = boton.getAttribute('data-imagen');

            console.log('nombre: ', nombre);
            console.log('precio: ', precio);
            console.log('imagen: ', imagen);

            // Configura los valores del formulario en el modal
            document.getElementById('valor-producto').value = precio;
            document.getElementById('modelo-producto').value = nombre;
            document.getElementById('foto-producto').value = imagen;

            // Muestra el fondo oscuro y el modal
            modalBackground.style.display = 'block';
            modal.style.display = 'block';
        });
    });

    // Función para solicitar la compra (puedes personalizarla según tus necesidades)
    compraForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir la recarga de la página

        // Aquí puedes agregar la lógica para enviar la solicitud de compra
        // Puedes acceder a los valores del formulario dentro del modal
        // utilizando document.getElementById() con los IDs correspondientes.

        // Por ejemplo, aquí puedes acceder a los valores del formulario:
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const discordtag = document.getElementById('discordtag').value;
        const valor = document.getElementById('valor-producto').value;
        const modelo = document.getElementById('modelo-producto').value;
        const foto = document.getElementById('foto-producto').value;
        const numeroOrden = generarNumeroOrden();

        const facturaHTML = `
            <p>Nombre: ${nombre}</p>
            <p>Apellido: ${apellido}</p>
            <p>Discordtag: ${discordtag}</p>
            <p>Producto: ${modelo}</p>
            <p>Precio: ${valor} DIX</p>
            <img src="${foto}" alt="${modelo}" id="imagen-producto-factura">
            <p><strong>Numero de Orden:</strong> ${numeroOrden}</p>

        `;

        // Inserta la factura en la sección de la factura
        document.getElementById('factura-content').innerHTML = facturaHTML;

        // Oculta el formulario de compra y muestra la factura
        compraForm.style.display = 'none';
        facturaContainer.style.display = 'block';
    });

    cerrarFacturaBtn.addEventListener('click', () => {
        // Oculta la factura y vuelve a mostrar el formulario de compra
        facturaContainer.style.display = 'none';
        compraForm.style.display = 'block';
    });
});
