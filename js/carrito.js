let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
         <span class="restar"> - </span>
         <p>Cantidad: ${product.cantidad}</p>
         <span class="sumar"> + </span>
         <p>Total: ${product.cantidad * product.precio}</p>
         <span class="delete-product"> ✖ </span>
		`;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
                product.cantidad--;  
            }
        renderCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            product.cantidad++;  
            renderCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");


        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });


    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad , 0);

    const totalBuy = document.createElement("div");
    totalBuy.classname = "total-content";
    totalBuy.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuy);


};

verCarrito.addEventListener("click", renderCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
    });

   carritoCounter();
   saveLocal();
   renderCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
