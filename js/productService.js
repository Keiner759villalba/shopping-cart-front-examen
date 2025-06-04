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