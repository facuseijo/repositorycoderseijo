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
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            renderCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            product.cantidad++;
            renderCarrito();

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
            });

            Toast.fire({
                icon: 'success',
                title: `Añadiste otro ${product.nombre} al carrito`,
            });

        });

        let eliminar = carritoContent.querySelector(".delete-product");


        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);

            Swal.fire({
                title: 'Estas seguro de eliminar el producto?',
                text: "Si eliminas ahora ya no aparecera!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'El poducto ha sido eliminado',
                        'success'
                    )
                }
            })
            if (carrito.length === 0) {
                carritoContent.innerHTML = "";
                carritoContent.innerHTML += `
                    <p>
                        No hay productos en el carro de compras
                    </p>
                    `;
            }
        });


    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuy = document.createElement("div");
    totalBuy.classname = "total-content";
    totalBuy.innerHTML = `TOTAL A PAGAR : ${total} $`;
    modalContainer.append(totalBuy);

    //funcion final pagar
    let Pagar = document.createElement("button");
    Pagar.innerText = "PAGAR";
    Pagar.className = "Pagar";

    Pagar.addEventListener("click", () => {
        function pagar() {

            Swal.fire({
                title: `¿Desea Finalizar la Compra?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#62371E',
                cancelButtonColor: '#b09175',
                cancelButtonText: 'Seguir comprando',
                confirmButtonText: 'Pagar',
            }).then((result) => {
                if (result.isConfirmed) {

                    localStorage.removeItem("carrito");
                    carrit.innerHTML = 0;
                    carritoContent.innerHTML = "";
                    carritoContent.innerHTML += `
    <p>
        No hay productos en el carrito
    </p>
    `;

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: false,
                        timer: 1800,

                    })

                    Toast.fire({
                        icon: 'success',
                        title: `Su compra fue realizada con exito`,

                    })

                }

            })

        }
        modalContainer.append(Pagar);
        console.log(pagar)

    });


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
}
