// script.js
function solicitarCompra() {
    // Mostrar el modal de confirmación de compra
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

// Espera 1 segundo (1000 milisegundos) y oculta la página de carga
setTimeout(function () {
    document.querySelector('.contenido-principal').style.display = 'block';
    document.querySelector('.pagina-carga').style.display = 'none';
}, 1000);
document.addEventListener("DOMContentLoaded", function () {
    const botonesComprar = document.querySelectorAll(".boton-comprar");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const compraForm = document.getElementById("compra-form");

    botonesComprar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const producto = this.parentElement;
            const nombreProducto = producto.querySelector("h2").textContent;
            const precioProducto = producto.querySelector("p.descripcion-veh_price").textContent;
            const imagenProducto = producto.querySelector("img.producto-img").src;

            // Obtener otros detalles del producto
            const capacidadProducto = producto.querySelector("p.descripcion-veh:nth-child(2)").textContent;
            const maleteroProducto = producto.querySelector("p.descripcion-veh:nth-child(3)").textContent;
            const gasolinaProducto = producto.querySelector("p.descripcion-veh:nth-child(4)").textContent;

            // Mostrar el modal
            modal.style.display = "block";

            // Completar información en el modal
            document.getElementById("valor").value = precioProducto;
            document.getElementById("modelo").value = nombreProducto;
            document.getElementById("foto").src = imagenProducto;

            // Establecer los valores de los campos ocultos del formulario
            document.getElementById("valor-producto").value = precioProducto;
            document.getElementById("modelo-producto").value = nombreProducto;
            document.getElementById("foto-producto").value = imagenProducto;
        });
    });

    closeModal.addEventListener("click", function () {
        // Ocultar el modal al hacer clic en la "X"
        modal.style.display = "none";
    });

    compraForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const discordtag = document.getElementById("discordtag").value;
        const valor = document.getElementById("valor-producto").value;
        const modelo = document.getElementById("modelo-producto").value;
        const foto = document.getElementById("foto-producto").value;

        // Generar la factura en formato HTML
        const facturaHTML = `
            <div class="factura-header">
                <h2>Factura de Compra</h2>
                <p>Fecha: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="factura-detalle">
                <h3>Detalles del Producto</h3>
                <p><strong>Producto:</strong> ${modelo}</p>
                <p><strong>Valor:</strong> ${valor}</p>
                <p><strong>Foto:</strong></p>
                <img src="${foto}" alt="Foto del producto" width="200">
            </div>
            <div class="factura-cliente">
                <h3>Detalles del Cliente</h3>
                <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                <p><strong>Discordtag:</strong> ${discordtag}</p>
            </div>
        `;

        // Mostrar la factura en el contenedor
        const facturaContainer = document.getElementById("factura-container");

        // Mostrar el modal (puedes usar la misma función que usabas para mostrar el modal previamente)
        modal.style.display = "block";
        facturaContainer.innerHTML = facturaHTML;
        const modalcontain=document.getElementById("modal-content")
        modalcontain.style.display = "none"
        // Cierra el modal después de mostrar la factura
    });
});
