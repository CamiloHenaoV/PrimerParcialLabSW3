let inventario = [
  { id: 1, nombre: "Camiseta", precio: 35000, stock: 10, imagen: "images/camiseta.png" },
  { id: 2, nombre: "Pantalón", precio: 60000, stock: 8, imagen: "images/pantalon.png" },
  { id: 3, nombre: "Zapatos", precio: 120000, stock: 5, imagen: "images/zapatos.png" },
  { id: 4, nombre: "Chaqueta", precio: 95000, stock: 6, imagen: "images/chaqueta.png" },
  { id: 5, nombre: "Gorra", precio: 20000, stock: 15, imagen: "images/gorra.png" },
  { id: 6, nombre: "Medias", precio: 8000, stock: 20, imagen: "images/medias.png" }
];

let carrito = [];

const catalogoEl = document.getElementById("catalogo");
const buscadorEl = document.getElementById("buscador");
const listaCarritoEl = document.getElementById("listaCarrito");
const totalCarritoEl = document.getElementById("totalCarrito");
const btnVaciarEl = document.getElementById("btnVaciar");

function renderCatalogo(lista) {
  if (!catalogoEl) return;
  catalogoEl.innerHTML = "";
  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio;

    const stock = document.createElement("p");
    stock.textContent = "Stock: " + producto.stock;

    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.disabled = producto.stock <= 0;
    boton.addEventListener("click", () => agregarAlCarrito(producto.id));

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(boton);

    catalogoEl.appendChild(tarjeta);
  });
}

function renderCarrito() {
  if (!listaCarritoEl) return;
  listaCarritoEl.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    li.textContent = item.nombre + " x" + item.cantidad + " - $" + subtotal;
    listaCarritoEl.appendChild(li);
  });

  totalCarritoEl.textContent = total;
}

function agregarAlCarrito(id) {
  const producto = inventario.find(p => p.id === id);
  if (!producto || producto.stock <= 0) return;

  producto.stock -= 1;

  const itemCarrito = carrito.find(i => i.id === id);
  if (itemCarrito) {
    itemCarrito.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  renderCatalogo(inventario);
  renderCarrito();
}

function vaciarCarrito() {
  carrito.forEach(item => {
    const producto = inventario.find(p => p.id === item.id);
    if (producto) {
      producto.stock += item.cantidad;
    }
  });

  carrito = [];

  renderCatalogo(inventario);
  renderCarrito();
}

function filtrarProductos() {
  const texto = buscadorEl.value.toLowerCase();
  const filtrados = inventario.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderCatalogo(filtrados);
}

if (buscadorEl) {
  buscadorEl.addEventListener("keyup", filtrarProductos);
}

if (btnVaciarEl) {
  btnVaciarEl.addEventListener("click", vaciarCarrito);
}

if (catalogoEl) {
  renderCatalogo(inventario);
  renderCarrito();
}
