function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Products List</h4>'
    fetch('https://fakestoreapi.com/products',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        body: data
                    }
                }
            )

        })
        .then(data => {
            if (data.status === 200) {
                let listProducts = `
                <button onclick="addProduct()" type="button" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Tiltle</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                `
                data.body.forEach((product, index) => {
                    listProducts += `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td><img src="${product.image}" class="card-img-top" alt="Product Image"></td>
                            <td>${product.title}</td>
                            <td>${product.price}</td>
                            <td><button class="btn btn-primary" onclick="getProduct('${product.id}')">View</button></td>
                        </tr>
                    `
                })
                document.getElementById('info').innerHTML = listProducts
            } else {
                document.getElementById('info').innerHTML = '<h3>Products not found</h3>'
            }
        });
}

function getProduct(id) {
    document.getElementById('cardHeader').innerHTML = '<h4>Products List</h4>'
    fetch(`https://fakestoreapi.com/products/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        body: data
                    }
                }
            )

        })
        .then((data) => {
            if (data.status === 200) {
                showProductInfo(data.body)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>Product not found</h3>'
            }
        })
}

function showProductInfo(product) {
    const modalProduct = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Info</h5>
                    <img src="${product.image}" class="card-img-top" alt="Product Image">
                    <p class="card-text"><strong>ID : </strong>${product.id}</p>
                    <p class="card-text"><strong>Title : </strong>${product.title}</p>
                    <p class="card-text"><strong>Description : </strong>${product.description}</p>
                    <p class="card-text"><strong>Category : </strong>${product.category}</p>
                    <p class="card-text"><strong>Price : </strong>${product.price}</p>
                    <p class="card-text"><strong>Rating : </strong>${product.rating.rate}</p>
                    <p class="card-text"><strong>Count : </strong>${product.rating.count}</p>
                    <p class="card-text"><strong>Created At : </strong>${product.createdAt}</p>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalProduct
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}
function addProduct() {
    const modalUserAdd = `
        <div class="modal fade" id="showModalProductAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                    <form id="formAddProduct">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="nameProduct" class="form-control" placeholder="Nombre Producto" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="number" id="precioProduct" class="form-control" placeholder="Precio" aria-label="Precio" required>
                            </div>
                        </div>

                       

                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button onclick="saveProduct()" type="button" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                            </div>
                        </div> 
                    </form>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalUserAdd;
    const modal = new bootstrap.Modal(document.getElementById('showModalProductAdd'));
    modal.show();
}

function saveProduct() {
    const form = document.getElementById('formAddProduct');
    if (form.checkValidity()) {
        const productName = document.getElementById('nameProduct').value;
        const cantidad = document.getElementById('precioProduct').value;
        
        
        const product = {productName, cantidad};

        const REQRES_ENDPOINT = 'https://fakestoreapi.com/products'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(product)
        })
        .then((response) =>response.json().then(data => ({status: response.status, info: data})))
        .then(result => {
            if (result.status === 200) {
                document.getElementById('info').innerHTML = '<h3 class="text-success"><i class="fa-solid fa-check"></i> El Producto se guardo correctamente</h3>';
            } else {
                document.getElementById('info').innerHTML = '<h3><i class="fa-solid fa-x"></i> No se guardo el producto en la api</h3>';
                const modalId = document.getElementById('showModalProductAdd');
                const modal = bootstrap.Modal.getInstance(modalId);
                modal.hide();
            }
        })
    } else {
        form.reportValidity();
    }
}