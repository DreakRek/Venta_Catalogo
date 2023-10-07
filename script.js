function generarNumeroOrden() {
    const numeroOrden = Math.floor(Math.random() * 10000000); // Genera un n鷐ero aleatorio entre 0 y 9999
    return numeroOrden;
}
function generatePDF() {
    var doc = new jsPDF();

    // Define el ancho y alto de la p醙ina
    var pageWidth = doc.internal.pageSize.width;
    var pageHeight = doc.internal.pageSize.height;

    // Define el margen superior
    var marginTop = 20;

    // Define colores personalizados
    var primaryColor = "#ff5733"; // Color primario
    var secondaryColor = "#333"; // Color secundario

    // Estilo de fuente personalizado
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Dibuja un rect醤gulo como fondo
    doc.setFillColor("#f3f3f3"); // Color del fondo
    doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Dibuja el rect醤gulo y lo llena

    // T韙ulo de la factura
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.text("Factura", 80, marginTop, true);

    // N鷐ero de orden
    doc.setFontStyle("normal");
    doc.setTextColor(secondaryColor);
    doc.setFontSize(12);
    doc.text("Numero de Orden: ", 20, marginTop + 20);
    doc.text(generarNumeroOrden().toString(), 70, marginTop + 20);

    // Datos del cliente
    doc.text("Nombre:", 20, marginTop + 40);
    doc.text(document.getElementById('nombre').value, 70, marginTop + 40);
    doc.text("Apellido:", 20, marginTop + 50);
    doc.text(document.getElementById('apellido').value, 70, marginTop + 50);
    doc.text("Discordtag:", 20, marginTop + 60);
    doc.text(document.getElementById('discordtag').value, 70, marginTop + 60);

    // Detalles del producto
    doc.text("Producto:", 20, marginTop + 80);
    doc.text(document.getElementById('modelo-producto').value, 70, marginTop + 80);
    doc.text("Precio:", 20, marginTop + 90);
    doc.text(document.getElementById('valor-producto').value + " DIX", 70, marginTop + 90);

    // Agrega una l韓ea divisoria
    doc.setLineWidth(0.5);
    doc.line(20, marginTop + 100, pageWidth - 20, marginTop + 100);

    // Precio total
    var total = parseFloat(document.getElementById('valor-producto').value);
    doc.setFontSize(14);
    doc.text("Total:", 20, marginTop + 110);
    doc.text(total.toFixed(2) + " DIX", 70, marginTop + 110);

    // Genera el c骴igo de barras
    var codigoDeBarras = generarNumeroOrden().toString();

    // Agrega el c骴igo de barras al PDF
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, codigoDeBarras, {
        format: "CODE128",
        displayValue: true,
        margin: 20,
    });

    // Convierte el canvas a una imagen en formato base64
    var barcodeDataUrl = canvas.toDataURL("image/png");

    // Agrega la imagen del c骴igo de barras al PDF
    doc.addImage(barcodeDataUrl, 'PNG', 20, marginTop + 130, 100, 30);

    // Guarda el PDF con un nombre espec韋ico
    doc.save('Factura-Vehiculo-Dix.pdf');
}


document.addEventListener('DOMContentLoaded', function () {
    const botonesComprar = document.querySelectorAll('.boton-comprar');
    const modalBackground = document.getElementById('modal-background');
    const modal = document.getElementById('modal');
    const botonCerrarModal = document.getElementById('close-modal');
    const compraForm = document.getElementById('compra-form');
    const facturaContainer = document.getElementById('factura-container');
    const cerrarFacturaBtn = document.getElementById('cerrar-factura-btn');

    // Agrega un controlador de clic al bot贸n/icono de cierre
    botonCerrarModal.addEventListener('click', () => {
        // Oculta el fondo oscuro y el modal al hacer clic en el bot贸n/icono de cierre
        modalBackground.style.display = 'none';
        modal.style.display = 'none';
    });
    // modalBackground.style.display = 'none';
    // modal.style.display = 'none';
    // Agrega un controlador de clic a cada bot贸n
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obt茅n los datos del producto desde el atributo "data"
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

    // Funci贸n para solicitar la compra (puedes personalizarla seg煤n tus necesidades)
    compraForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir la recarga de la p谩gina

        // Aqu铆 puedes agregar la l贸gica para enviar la solicitud de compra
        // Puedes acceder a los valores del formulario dentro del modal
        // utilizando document.getElementById() con los IDs correspondientes.

        // Por ejemplo, aqu铆 puedes acceder a los valores del formulario:
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const discordtag = document.getElementById('discordtag').value;
        const valor = document.getElementById('valor-producto').value;
        const modelo = document.getElementById('modelo-producto').value;
        const foto = document.getElementById('foto-producto').value;
        const numeroOrden = generarNumeroOrden();


        const facturaHTML = `
            <h2>Factura</h2>
            <p>Nombre: ${nombre}</p>
            <p>Apellido: ${apellido}</p>
            <p>Discordtag: ${discordtag}</p>
            <p>Producto: ${modelo}</p>
            <p>Precio: ${valor} DIX</p>
            <img src="${foto}" alt="${modelo}" id="imagen-producto-factura">
            <p><strong>Numero de Orden:</strong> ${numeroOrden}</p>

        `;
        // Inserta la factura en la secci髇 de la factura
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
