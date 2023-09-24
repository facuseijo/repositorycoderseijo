const productos = [
    {
       id:1,
       nombre: "Paleta Cocida Cagnoli",
       precio: 1840,
       img:   "../images/fiambre_de_cerdo.png",
    },
    {
       id:2,
       nombre: "Jamon Cocido Cagnoli",
       precio: 3400,
       img: "../images/jamoncocido_Cagnoli.png",
    },
    {
       id:3,
       nombre: "Jamon Natural Cagnoli",
       precio: 4900,
       img:  "../images/natu.jpeg",
    },
    {
       id:4,
       nombre: "Lomo Ahumado Lario",
       precio: 3810,
       img: "../images/lomo.jpg",
    },
    {
       id:5,
       nombre: "Mortadela Bocha Calchaqui",
       precio: 2110,
       img:  "../images/bocha.png",
    },
    {
       id:6,
       nombre: "Panceta Ahumada Bierzo",
       precio: 4500,
       img:  "../images/pancetabierzo.jpg",
    },
    {
       id:7,
       nombre: "Salamines Cagnoli",
       precio: 5380,
       img: "../images/salamines.jpg",
    },
    {
       id:8,
       nombre: "Salame Cagnoli",
       precio: 4060,
       img: "../images/milan.png",
    },
    {
       id:9,
       nombre: "Jamon Crudo Weber",
       precio: 4110,
       img: "../images/crudo.jpg",
    },
    {
       id:10,
       nombre: "Cantimpalo Lario",
       precio: 3810,
       img: "../images/cantimpalo.jpg",
    },
    {
       id:11,
       nombre: "Holanda Varense",
       precio: 2900,
       img: "../images/varense.jpeg",
    },
    {
       id:12,
       nombre: "Reggiano Silvia",
       precio: 3580,
       img: "../images/reggiano.jpg",
    },
];


const shopContent = document.querySelector("#shopcontent");
const verCarrito = document.querySelector("#verCarrito");
const modalContainer = document.querySelector("#modalcontainer");

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

verCarrito.addEventListener("click", () => {
	modalContainer.innerHTML = "";
	modalContainer.style.display = "flex";
	const modalHeader = document.createElement("div");
	modalHeader.className = "modal-header"
	modalHeader.innerHTML = `
	<h3 class="modal-Header-title">Carrito.</h3>
	`;
	modalContainer.append(modalHeader);

	const modalbutton = document.createElement("h3");
	modalbutton.innerText = "X";
	modalbutton.className = "modal-header-button";

	modalbutton.addEventListener("click", () => {
		modalContainer.Style.display = "none";
	});

	modalHeader.append(modalbutton);


	carrito.forEach((product) => {
		let carritoContent = document.createElement("div")
		carritoContent.className = "modal-content";
		carritoContent.innerHTML = `
		 <img src="${product.img}">
		 <h3>${product.nombre}</h3>
		 <p>${product.precio}$</p>
		`;

		modalContainer.append(carritoContent);
	});

	const total = carrito.reduce((acc, el) => acc + el.precio, 0);

	const totalBuy = document.createElement("div")
	totalBuy.classname = "total-content";
	totalBuy.innerHTML = `Total a pagar: ${total} $`;

	modalContainer.append(totalBuy);
	
	
});

