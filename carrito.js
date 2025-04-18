// Función para actualizar el carrito visualmente
function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const tablaCarrito = document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0];
  tablaCarrito.innerHTML = ''; // Limpiar tabla antes de renderizar

  let total = 0;

  // Renderizar productos en la tabla
  carrito.forEach((producto, index) => {
    const row = tablaCarrito.insertRow();
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td><input type="number" value="${producto.cantidad}" min="1" class="cantidad" data-index="${index}"></td>
      <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
      <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
    `;

    total += producto.precio * producto.cantidad;
  });

  // Mostrar el total
  document.getElementById('totalCarrito').textContent = total.toFixed(2);

  // Agregar eventos de eliminar y actualizar cantidad
  document.querySelectorAll('.eliminar').forEach(button => {
    button.addEventListener('click', eliminarProducto);
  });

  document.querySelectorAll('.cantidad').forEach(input => {
    input.addEventListener('change', actualizarCantidad);
  });
}

// Función para eliminar producto del carrito
function eliminarProducto(event) {
  const index = event.target.getAttribute('data-index');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(event) {
  const index = event.target.getAttribute('data-index');
  const cantidad = parseInt(event.target.value);
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (cantidad < 1) return; // Evitar cantidades menores a 1

  carrito[index].cantidad = cantidad;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Función para finalizar la compra (puedes integrarlo con WhatsApp o formulario)
document.getElementById('finalizar-compra').addEventListener('click', function() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
  alert(`Total a pagar: $${total.toFixed(2)}`);
  // Aquí podrías integrar con WhatsApp u otra pasarela de pago
});

// Inicializar carrito
actualizarCarrito();
