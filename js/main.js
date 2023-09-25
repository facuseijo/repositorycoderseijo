
const shopContent = document.querySelector("#shopcontent");
const verCarrito = document.querySelector("#verCarrito");
const modalContainer = document.querySelector("#modal-container");

let carrito = []

productos.forEach((product) => {
	let content = document.createElement("div");
	content.className = "cardprod";
	content.innerHTML = `
	<img src="${product.img}">
	<h3>${product.nombre}</h3>
	<p class="price">${product.precio}$</p>
	`;

	shopContent.append(content);

	let Comprar = document.createElement("button");
	Comprar.innerText = "Comprar";
	Comprar.className = "Comprar";

	content.append(Comprar);

	Comprar.addEventListener("click", () => {
		carrito.push({
			id: product.id,
			img: product.img,
			nombre: product.nombre,
			precio: product.precio,
		});
	});
});


