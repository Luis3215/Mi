let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} fue agregado al carrito`);
}

function cargarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    total.textContent = "$0.00";
    return;
  }

  carrito.forEach((producto, index) => {
    const fila = document.createElement("div");
    fila.className = "item-carrito";
    fila.innerHTML = `
      <span>${producto.nombre}</span>
      <span>Cantidad: <button onclick="cambiarCantidad(${index}, -1)">-</button> ${producto.cantidad} <button onclick="cambiarCantidad(${index}, 1)">+</button></span>
      <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(fila);
  });

  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  total.textContent = `$${totalPrecio.toFixed(2)}`;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function confirmarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const mensaje = carrito.map(p => `${p.cantidad} x ${p.nombre}`).join(", ");
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2);
  const whatsapp = `https://wa.me/593979224596?text=Hola,%20quiero%20comprar:%20${encodeURIComponent(mensaje)}%20-%20Total:%20$${total}`;
  window.open(whatsapp, "_blank");
}

