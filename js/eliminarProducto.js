import { conectaAPI } from './conectaAPI.js';

export function agregarListenerEliminar(productoId, productoElement) {
    // Agregar el evento al botón de eliminar
    const eliminarBtn = productoElement.querySelector(".producto_boton");

    eliminarBtn.addEventListener("click", async () => {
        try {
            // Eliminar el producto desde la API usando el id del producto
            await conectaAPI.eliminarProducto(productoId);
            // Eliminar el producto de la interfaz (DOM)
            productoElement.remove();
        } catch (e) {
            alert("No se pudo eliminar el producto.");
        }
    });
}
