
renderCarrito = () => {
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
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
		 <img src="${product.img}">
		 <h3>${product.nombre}</h3>
		 <p>${product.precio}$</p>
         <p>Cantidad: ${product.cantidad}</p>
         <p>Total: ${product.cantidad * product.precio}</p>
		`;

        modalContainer.append(carritoContent);
console.log(length);
        let eliminar = document.createElement("span");
        eliminar.innerText = "✖";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad , 0);

    const totalBuy = document.createElement("div");
    totalBuy.classname = "total-content";
    totalBuy.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuy);


};

verCarrito.addEventListener("click", renderCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
    });

   carritoCounter();
   renderCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
};

