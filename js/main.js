
const shopContent = document.querySelector("#shopcontent");
const verCarrito = document.querySelector("#verCarrito");
const modalContainer = document.querySelector("#modal-container");
const cantidadCarrito = document.querySelector("#cantidadCarrito");

const getProducts = async () => {
	const response = await fetch("../data/productos.json");
    const data = await response.json(); 
	
	data.forEach((product) => {
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
			// funcion sumar de a un producto si se repite el id en la compra
			const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
	
			if (repeat) {
				carrito.map((prod) => {
					if (prod.id === product.id) {
					 prod.cantidad++;
					}
				});
			} else {
				carrito.push({
					id: product.id,
					img: product.img,
					nombre: product.nombre,
					precio: product.precio,
					cantidad: product.cantidad,
				});
				console.log(carrito);
				carritoCounter();
				saveLocal();
			};
		});
	});
};

getProducts();

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};
