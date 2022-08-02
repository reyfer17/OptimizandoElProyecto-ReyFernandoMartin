//declaracion de clases, métodos, objetos y arrays
class Producto {
    constructor(codigo, nombre, precio, detalle, imagen){
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.detalle = detalle
        this.imagen = imagen
    }
    totalizar(pedido){
        let totalPedido = 0
        pedido.forEach (elemento =>{
            totalPedido += elemento.precio ?? 1000 //control por si trae undefined o null, suma el valor maximo de los productos que hay, me aseguro de no perder plata
        })

        return totalPedido
    }
}

const pochocloGrande = new Producto (1, "Pochoclo Grande", 1000, "dulce, en balde", 'images/pochocloGrande.jpg')
const pochocloMediano = new Producto (2, "Pochoclo Mediano", 800, "dulce, en caja", 'images/pochocloMediano.jpg')
const pochocloChico = new Producto (3, "Pochoclo Chico", 600, "dulce, en bolsita", 'images/pochocloChico.gif')
const gaseosaGrande = new Producto (4, "Gaseosa Grande", 500, "vaso x 950ml", 'images/gaseosaGrande.jpg')
const gaseosaChica = new Producto (5, "Gaseosa Chica", 400, "botella x 500ml", 'images/gaseosaChica.jpg')
const agua = new Producto (6, "Agua", 300, "botella x 500ml", 'images/agua.png')
const chocolate = new Producto (7, "Chocolate", 800, "con leche x 300g", 'images/chocolate.jpg')

const productos = [pochocloGrande, pochocloMediano, pochocloChico, gaseosaGrande, gaseosaChica, agua, chocolate]

const divProductos =document.getElementById("productos")
const divCarrito =document.getElementById("carritoHTML")
const divTotal =document.getElementById("total")
const divCantidadEnCarrito =document.getElementById("cantidadEnCarrito")
const botonMostrarCarrito = document.getElementById("botonMostrarCarrito")
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
let carrito = []
let pedido = []
let cantidad = 0
//preparación del localStorage
if(localStorage.getItem("pedido")){
    pedido =JSON.parse(localStorage.getItem("pedido"))
    //carrito = pedido
    carrito = structuredClone(pedido) //agregado de structured clone
} else {localStorage.setItem("pedido", JSON.stringify(carrito))}

//recorro el array de productos para mostrarlo por HTML
productos.forEach (producto => {
    divProductos.innerHTML += `
    <div class="card productos"  id="${producto.codigo}" 
    style="width: 14rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.detalle}</p>
            <h2 class="card-text">$${producto.precio}</h2>
            <button class="btn btn-success" onclick="avisoYCarga(${producto.codigo})">Agregar</button>
        </div>
    </div>
    `
})
//hago la carga del carrito con una función a través de un onclick en el HTML
function avisoYCarga (codigo){
    productos.forEach (producto => {
    //    if (producto.codigo == codigo){
    //       carrito.push(producto)
    //       localStorage.setItem("pedido", JSON.stringify(carrito))
    //    }
    (producto.codigo == codigo)? (carrito.push(producto), localStorage.setItem("pedido", JSON.stringify(carrito))): "" // operador ternario
    })
}
//le doy estructura al HTML
cantidad = carrito.length
divCantidadEnCarrito.innerHTML = `
<div>Total de productos en carrito: ${cantidad}</div>
`
//con el botón mostrar carrito pido mostrar la primera carga y actualizar con cargas posteriores
//también recargando la página y luego con el boton mostrar recupero el localStorage
botonMostrarCarrito.addEventListener("click",() =>{
    divCarrito.innerHTML =`
    <h2 id="tituloCarrito">Carrito de compras</h2>
    `
    cantidad= carrito.length
    divCantidadEnCarrito.innerHTML = `
    <div>Total de productos en carrito: ${cantidad}</div>
    `
    divTotal.innerHTML =``
//con otro forEach recorro el array de objetos guardados para mostrar los productos agregados al carrito    
    carrito.forEach ((elemento, indice) => {
        divCarrito.innerHTML += `
        <div class="card carrito" id="producto${indice}"
        style="width: 14rem;">
            <img src="${elemento.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elemento.nombre}</h5>         
                <h2 class="card-text">$${elemento.precio}</h2>
                
            </div>
        </div>
        `
       // <button class="btn btn-danger">Eliminar</button> //linea eliminada de la tarjeta en carrito
    })
    //tuve que comentar esta porción de código porque cuando le daba eliminar por segunda vez, fallaba el índice y eliminaba cualquier cosa
    /*carrito.forEach((producto, indice) => {
        //console.log(document.getElementById(`producto${indice}`).lastElementChild.lastElementChild)
        let botonCard = document.getElementById(`producto${indice}`).lastElementChild.lastElementChild
        botonCard.addEventListener("click", () =>{
            //console.log(producto)
            document.getElementById(`producto${indice}`).remove()
            carrito.splice(indice,1) 
            localStorage.setItem("pedido", JSON.stringify(carrito))
            divTotal.innerHTML =``
            let p =new Producto
            divTotal.innerHTML +=`
            <div class="card"
            style="width: 30rem;">
                <div class="card-body total">
                    <h5 class="card-title">TOTAL: $${p.totalizar(carrito)}</h5>
                </div>
            </div>
            `
        })
    })*/
//muestro el total una vez actualizado el carrito, por html
    let p = new Producto
    divTotal.innerHTML +=`
    <div class="card" 
    style="width: 100%;">
        <div class="card-body total">
            <h5 class="card-title">TOTAL: $${p.totalizar(carrito)}</h5>
        </div>
    </div>
    `
})
//elimino toda la info del array y del localStorage y vuelvo a cero con la carga
botonVaciarCarrito.addEventListener("click",() =>{
    divCarrito.innerHTML =``
    divTotal.innerHTML =``
    carrito.splice(0,carrito.length)
    localStorage.setItem("pedido", JSON.stringify(carrito))
    cantidad= carrito.length
    divCantidadEnCarrito.innerHTML = `
    <div>Total de productos en carrito: ${cantidad}</div>
    `
})