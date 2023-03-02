// Variables
const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso) // Para agregar al carrito
    carrito.addEventListener('click', eliminarCurso) // Para eliminar del carrito
    vaciarCarritoBtn.addEventListener('click', () => { // Vaciar el carrito
        articulosCarrito = [] // reseteamos el array

        limpiarHTML() // Limpiar todo el HTML
    })
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

        carritoHTML()
    })
}

// Funciones
function agregarCurso(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        // Elimina del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML()
    }
}

function leerDatosCurso(curso){
    // console.log(curso)

    // Objeto que guarda el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisar si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            }else{
                return curso
            }
        } )
        articulosCarrito = [...cursos]
    }else{
        // Agregar curso al carrito
        // Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// Mostrar el carrito en HTML
function carritoHTML(){
    // Limpiar el HTML
    limpiarHTML()

    // Generar el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `

        // Agrega el HTML en el tbody
        contenedorCarrito.appendChild(row)
    })

    // Agregamos localStorage
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Eliminar cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}