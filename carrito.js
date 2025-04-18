let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} fue agregado al carrito`);
}

function cargarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<p>Tu carrito está vacío.</p>";
    total.textContent = "$0.00";
    return;
  }

  carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <span>${item.nombre}</span>
      <span>Cantidad: <button onclick="cambiarCantidad(${i}, -1)">-</button> ${item.cantidad} <button onclick="cambiarCantidad(${i}, 1)">+</button></span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
      <button onclick="eliminarProducto(${i})">Eliminar</button>
    `;
    lista.appendChild(div);
  });

  const totalPrecio = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  total.textContent = `$${totalPrecio.toFixed(2)}`;
}

function cambiarCantidad(i, valor) {
  carrito[i].cantidad += valor;
  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function eliminarProducto(i) {
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function confirmarPedido() {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const mensaje = carrito.map(p => `${p.cantidad} x ${p.nombre}`).join(", ");
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0).toFixed(2);
  const url = `https://wa.me/593979224596?text=Hola,%20quiero%20comprar:%20${encodeURIComponent(mensaje)}%20-%20Total:%20$${total}`;
  window.open(url, "_blank");
}
