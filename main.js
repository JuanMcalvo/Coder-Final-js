let searchInput = document.getElementById('searchInput');
let productList = document.getElementById('productList').getElementsByClassName('card');
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Busca el carrito en el storage o lo inicializa.
let lista = [];

const btnCart = document.querySelector('.container-carrito');
const containerCartProducts = document.querySelector('.container-cart-products');
//evento de icono carrito
document.addEventListener('click', function(event) {
    const containerCartProducts = document.querySelector('.container-cart-products');
    const btnCart = document.querySelector('.container-carrito');

    // Verificar si el clic ocurrió fuera del div "container-cart-products"
    if (!containerCartProducts.contains(event.target) && !btnCart.contains(event.target)) {
        containerCartProducts.classList.add('hidden-cart');
    }
});
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
})

// Agregar evento de escucha al campo de búsqueda
searchInput.addEventListener('keyup', function () {
    let searchTerm = searchInput.value.toLowerCase();

    //  Recorrer las tarjetas de productos y muestra u oculta segun la búsqueda
    for (let i = 0; i < productList.length; i++) {
        let title = productList[i].querySelector('.card-title').textContent.toLowerCase();
        let description = productList[i].querySelector('.card-text').textContent.toLowerCase();

        if (title.indexOf(searchTerm) > -1 || description.indexOf(searchTerm) > -1) {
            productList[i].style.display = 'block'; // Muestra
        } else {
            productList[i].style.display = 'none'; // Oculta
        }
    }
});

// Cargar los productos desde el archivo JSON


fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        lista = data;
        generarListaProductos();

        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado && Array.isArray(carritoGuardado)) {
            carrito = carritoGuardado;
            actualizarContadorCarrito();
            actualizarCarritoDOM();
        }
    })
    .catch(error => console.error('Error al cargar los productos:', error));

// Obtener el elemento del contenedor de productos
let productListContainer = document.getElementById('productList');

// Generar dinámicamente el listado de productos
function generarListaProductos() {
    for (let i = 0; i < lista.length; i++) {
        let producto = lista[i];

        // Crear elementos HTML para cada producto
        let card = document.createElement('div');
        card.classList.add('card', 'w-50', 'm-auto', 'mb-2');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let img = document.createElement('img');
        img.src = "./img/non-skin.gif";
        img.classList.add('product-img')
        img.alt = "";

        let nombre = document.createElement('h5');
        nombre.classList.add('card-title');
        nombre.textContent = producto.nombre;

        let descripcion = document.createElement('p');
        descripcion.classList.add('card-text');
        descripcion.innerHTML = producto.info + "<br>" + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam consectetur doloremque, nemo neque";

        let btnAgregar = document.createElement('a');
        btnAgregar.href = "#";
        btnAgregar.classList.add('btn', 'btn-primary');
        btnAgregar.textContent = "Agregar al carrito";
        btnAgregar.id = "btn" + i;
        btnAgregar.addEventListener('click', function () {
            agregarCarrito(producto);
            actualizarCarritoDOM();
        });
        // Agregar los elementos al DOM
        cardBody.appendChild(img);
        cardBody.appendChild(nombre);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(btnAgregar);

        card.appendChild(cardBody);
        productListContainer.appendChild(card);
    }

}
for (let i = 0; i < lista.length; i++) {
    let producto = lista[i];

    // Crear elementos HTML para cada producto
    let card = document.createElement('div');
    card.classList.add('card', 'w-50', 'm-auto', 'mb-2');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let img = document.createElement('img');
    img.src = "./img/non-skin.gif";
    img.classList.add('product-img')
    img.alt = "";

    let nombre = document.createElement('h5');
    nombre.classList.add('card-title');
    nombre.textContent = producto.nombre;

    let descripcion = document.createElement('p');
    descripcion.classList.add('card-text');
    descripcion.innerHTML = producto.info + "<br>" + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam consectetur doloremque, nemo neque";

    let btnAgregar = document.createElement('a');
    btnAgregar.href = "#";
    btnAgregar.classList.add('btn', 'btn-primary');
    btnAgregar.textContent = "Agregar al carrito";
    btnAgregar.id = "btn" + i;
    btnAgregar.addEventListener('click', function () {
        agregarCarrito(producto);
        actualizarCarritoDOM();
    });
    // Agregar los elementos al DOM
    cardBody.appendChild(img);
    cardBody.appendChild(nombre);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(btnAgregar);

    card.appendChild(cardBody);
    productListContainer.appendChild(card);
}

function agregarCarrito(producto) {

    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Toastify({
        text: 'Agregado al carrito',
        duration: 1500,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#27ae60',
    }).showToast();

    actualizarContadorCarrito();
    actualizarCarritoDOM();

    let titulo = document.querySelector('.titulo-producto-carrito');
    titulo.textContent = producto.nombre;

}

function actualizarContadorCarrito() {
    let contador = document.getElementById('contador-productos');
    contador.innerText = carrito.length;

}

function insertarElementos(producto) {
    let cantidadProd = document.createElement('span');
    cantidadprod = document.getElementById()
}

function actualizarCarritoDOM() {
    const cartProducts = document.querySelector('.row-product');
    const cartTotal = document.querySelector('.total-pagar');

    // Limpiar el contenido del carrito antes de actualizarlo
    cartProducts.innerHTML = ' ';

    // Recorrer los productos en el carrito
    carrito.forEach(producto => {
        // Crear elementos HTML para cada producto en el carrito
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart-product');

        const infoCartProduct = document.createElement('div');
        infoCartProduct.classList.add('info-cart-product');

        const cantidadProducto = document.createElement('span');
        cantidadProducto.id = 'cantidad-producto-carrito';
        cantidadProducto.textContent = obtenerCantidadProducto(producto.codigo); //compara por codigo si esta en el carrito

        const tituloProducto = document.createElement('p');
        tituloProducto.classList.add('titulo-producto-carrito');
        tituloProducto.textContent = producto.nombre;

        const precioProducto = document.createElement('span');
        precioProducto.classList.add('precio-producto-carrito');
        precioProducto.textContent = `$${producto.precio}`;


        const btnRemove = document.createElement('button');
        btnRemove.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
            </svg>
        `;
        btnRemove.classList.add('btn', 'btn-light')

        btnRemove.addEventListener('click', function () {
            const index = Array.from(cartProducts.children).indexOf(this.parentElement); // Obtener el índice del producto en el carrito
            eliminarProducto(index);
        });

        infoCartProduct.appendChild(cantidadProducto);
        infoCartProduct.appendChild(tituloProducto);
        infoCartProduct.appendChild(precioProducto);

        cartProduct.appendChild(infoCartProduct);
        cartProduct.appendChild(btnRemove);


        cartProducts.appendChild(cartProduct);
    });

    // Calcular y mostrar el total a pagar
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    cartTotal.textContent = `$${total}`;
}

function obtenerCantidadProducto(codigo) {
    // Buscar el producto en el carrito por su código y obtener su cantidad
    const productoEnCarrito = carrito.find(producto => producto.codigo === codigo);
    return productoEnCarrito ? 1 : 0;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    Toastify({
        text: 'Producto eliminado',
        duration: 1500,
        gravity: 'top', 
        position: 'right', 
        backgroundColor: '#E74C3C', 
    }).showToast();
    actualizarContadorCarrito();
    actualizarCarritoDOM();
}