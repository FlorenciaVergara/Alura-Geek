import { conectaAPI } from "./conectaAPI.js";
import { agregarListenerEliminar } from './eliminarProducto.js'; // Importa la función de eliminación

const lista = document.querySelector("[data-lista]");


export default function construyeCard(nombre, precio, imagen) {
    const producto = document.createElement("li");
    producto.className = "producto_item";

    producto.innerHTML = `<img class="producto_imagen" src="${imagen}" alt="imagen Stormtrooper">
                    <p class="producto_nombre">${nombre}</p>
                    <div>
                        <p class="producto_precio">${precio}</p>
                        <button class="producto_boton">
                            <img class="boton_icono" src="/img/🦆 icon _trash 2_.png" alt="dibujo tacho basura">
                        </button>
                    </div>`

    return producto;
}


async function listaProductos() {
    try{
        const listaAPI = await conectaAPI.listaProductos();  // Obtienes los productos desde la API
        
        // Verificar si la lista está vacía
        if (listaAPI.length === 0) {
            lista.innerHTML = `
                                <div class="mensaje_container">
                                    <h3 class="mensaje_titulo">No hay productos disponibles</h3>
                                    <img class="mensaje_imagen" src="/img/sinProductos.png" alt="dibujo de chica con signos de pregunta">
                                </div>
                            `
        } else {
            // Si hay productos, construimos las tarjetas
            listaAPI.forEach(element => {
                const productoCard = construyeCard(element.nombre, element.precio, element.imagen);
                
                // Asignamos el id dinámicamente al botón de eliminar
                const eliminarBtn = productoCard.querySelector(".producto_boton");
                eliminarBtn.setAttribute("data-id", element.id);  // Asignamos el id del producto al botón

                // Agregamos el listener para manejar la eliminación
                agregarListenerEliminar(element.id, productoCard);

                // Agregamos la tarjeta al DOM
                lista.appendChild(productoCard);
            });
        }
    }catch{
        lista.innerHTML=`<h3 class="mensaje_titulo">No fue posible cargar la lista de productos</h3>`;
    }
}

listaProductos();