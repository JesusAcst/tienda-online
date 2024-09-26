// Carrito de compras
let carrito = [];
const carritoLista = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');

// Botones de "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

// Agregar evento a cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarProductoAlCarrito);
});

function agregarProductoAlCarrito(e) {
    const nombreProducto = e.target.getAttribute('data-nombre');
    const precioProducto = parseFloat(e.target.getAttribute('data-precio'));

    // Añadir producto al carrito
    const producto = {
        nombre: nombreProducto,
        precio: precioProducto
    };

    carrito.push(producto);
    mostrarCarrito();
    actualizarTotal();
}

function mostrarCarrito() {
    carritoLista.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        
        // Botón para eliminar producto del carrito
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('eliminar-producto');
        btnEliminar.setAttribute('data-index', index);
        
        li.appendChild(btnEliminar);
        carritoLista.appendChild(li);
    });

    // Agregar eventos a los botones "Eliminar"
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarProductoDelCarrito);
    });
}

function eliminarProductoDelCarrito(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    carrito.splice(index, 1); // Eliminar producto del carrito
    mostrarCarrito();
    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    totalCarrito.textContent = total.toFixed(2);
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
    actualizarTotal();
});

// Validación de formularios
document.querySelector('form[action="#"]').addEventListener('submit', function(e) {
    const email = document.getElementById('email-suscripcion');
    if (!email.checkValidity()) {
        alert('Por favor, ingresa un correo válido.');
        e.preventDefault();
    }
});
