function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Carts List</h4>'
    fetch('https://fakestoreapi.com/carts',
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
                let listCarts = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                `
                data.body.forEach((cart, index) => {
                    listCarts += `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${cart.userId}</td>
                            <td>${cart.date}</td>
                            <td><button class="btn btn-primary" onclick="getCart('${cart.id}')">View</button></td>
                        </tr>
                    `
                })
                document.getElementById('info').innerHTML = listCarts
            } else {
                document.getElementById('info').innerHTML = '<h3>Cart not found</h3>'
            }
        });
}

function getCart(id) {
    document.getElementById('cardHeader').innerHTML = '<h4>Carts List</h4>'
    fetch(`https://fakestoreapi.com/carts/${id}`,
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
                showCartInfo(data.body)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>Cart not found</h3>'
            }
        })
}

function showCartInfo(user) {
    const modalCart = `
    <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Cart Info</h5>
                    <p class="card-text"><strong>User ID: </strong>${user.userId}</p>
                    <p class="card-text"><strong>Date: </strong>${user.date}</p>
                    <p class="card-text"><strong>Products: </strong></p>
                    <ul>
                        ${user.products.map(product => `
                            <li>
                                <p><strong>Product ID: </strong>${product.productId}</p>
                                <p><strong>Quantity: </strong>${product.quantity}</p>
                            </li>
                        `).join('')}
                    </ul>
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
    document.getElementById('showModal').innerHTML = modalCart
    const modal = new bootstrap.Modal(document.getElementById('modalCart'))
    modal.show()
}