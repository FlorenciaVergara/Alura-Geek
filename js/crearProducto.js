import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");

//validaciones

async function crearProducto(evento){
    evento.preventDefault();
    const imagen= document.querySelector("[data-imagen]").value;
    const precio = document.querySelector("[data-precio]").value;
    const nombre=document.querySelector("[data-nombre]").value;

    try{
        await conectaAPI.crearProducto(nombre,precio,imagen)
    
        window.location.href="../envioProducto.html"
    }catch(e){
        alert(e);
    }
}

formulario,addEventListener("submit",evento=>crearProducto(evento));