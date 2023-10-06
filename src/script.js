const botonesComprar = document.querySelectorAll('.boton-comprar');
const modal = document.getElementById('modal');
// Agrega un controlador de clic a cada botón
botonesComprar.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtén los datos del producto desde el atributo "data"
        const nombre = boton.getAttribute('data-nombre');
        const precio = boton.getAttribute('data-precio');
        const imagen = boton.getAttribute('data-imagen');

        // Configura los valores del formulario en el modal
        document.getElementById('valor-producto').value = precio;
        document.getElementById('modelo-producto').value = nombre;
        document.getElementById('foto-producto').value = imagen;

        // Muestra el modal
        const modalBackground = document.getElementById('modal-background');
        modalBackground.style.display = 'block';
        document.getElementById('modal').style.display = 'block';
        setTimeout(() => {
            const botonCerrarModal = document.getElementById('close-modal');
            
            // Agrega un controlador de clic al botón/icono de cierre
            botonCerrarModal.addEventListener('click', () => {
                // Oculta el modal al hacer clic en el botón/icono de cierre
                document.getElementById('modal').style.display = 'none';
                modalBackground.style.display = 'none';
            });
        }, 1000);
    });
});

// Función para solicitar la compra (puedes personalizarla según tus necesidades)
function solicitarCompra() {
    // Aquí puedes agregar la lógica para enviar la solicitud de compra
    // Puedes acceder a los valores del formulario dentro del modal
    // utilizando document.getElementById() con los IDs correspondientes.
}
// Obtén una referencia al botón/icono de cierre





