function getUsers(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usuarios</h4>'
    fetch('https://fakestoreapi.com/users', {
        method: "GET",
        headers: {
            'x-api-key': 'reqres-free-v1',
            "Content-type": "application/json"
        },
        
    })
    .then((result) => {
        return result.json().then(
            data =>{
                return {
                    status: result.status,
                    body: data
                  
                }
                
            }
        )
    })
    .then((response) => {
        console.log(response);
        if(response.status === 200){
            
           let listUsers = `
                <button onclick="addUser()" type="button" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></button>
                <table class="table">
                    <thead>
                    <tr>
                         <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                
           
           
           
           `
           response.body.forEach((user, index) => {
            listUsers += `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${user.name.firstname}</td>
                    <td>${user.name.lastname}</td>
                    <td><button class="btn btn-primary" onclick="showInfoUser('${user.id}')">View</button></td>
                </tr>
            `
        })
           listUsers = listUsers.concat(`
                </tbody>
            </table>
            
            `)
            document.getElementById('info').innerHTML = listUsers;

        } else{
            document.getElementById('info').innerHTML = listUsers;
        }
    })
    

}
function showInfoUser(userId){
    fetch('https://fakestoreapi.com/users/'+userId, {
        method: "GET",
        headers: {
            'x-api-key': 'reqres-free-v1',
            "Content-type": "application/json"
        },
        
    })
    .then((result) => {
        return result.json().then(
            data =>{
                return {
                    status: result.status,
                    body: data
                  
                }
                
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            console.log(response.body)
            showModalUser(response.body)
        }else{
            document.getElementById('info').innerHTML = '<h3>No se encontró usuario</h3>'
        }
    })
}
function showModalUser(user){
    const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card">
            <img src="${user.image}" class="card-img-top" alt="Avatar">
            <div class="card-body">
            <h5 class="card-title">User Info</h5>
            <p class="card-text">First Name: ${user.first_name}</p>
            <p class="card-text">First Name: ${user.lastName}</p>
            <p class="card-text">First Name: ${user.email}</p>


           
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
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}
function addUser() {
    const modalUserAdd = `
        <div class="modal fade" id="showModalUserAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                    <form id="formAddUser">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="email" id="emailUser" class="form-control" placeholder="Email" aria-label="email" required>
                            </div>
                        </div>

                        <div class="row mt-3">
                            
                            <div class="col">
                                <input type="text" id="passwordUser" class="form-control" placeholder="Contraseña" aria-label="password" required>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button onclick="saveUser()" type="button" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
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
    const modal = new bootstrap.Modal(document.getElementById('showModalUserAdd'));
    modal.show();
}

function saveUser() {
    const form = document.getElementById('formAddUser');
    if (form.checkValidity()) {
        const firstName = document.getElementById('first_name').value;
        const email = document.getElementById('emailUser').value;
        const password = document.getElementById('passwordUser').value;
        
        const user = {firstName, email, password};

        const REQRES_ENDPOINT = 'https://fakestoreapi.com/users'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((response) =>response.json().then(data => ({status: response.status, info: data})))
        .then(result => {
            if (result.status === 200) {
                document.getElementById('info').innerHTML = '<h3 class="text-success"><i class="fa-solid fa-check"></i> El usuario se guardo correctamente</h3>';
            } else {
                document.getElementById('info').innerHTML = '<h3><i class="fa-solid fa-x"></i> No se guardo el usuario en la api</h3>';
                const modalId = document.getElementById('showModalUserAdd');
                const modal = bootstrap.Modal.getInstance(modalId);
                modal.hide();
            }
        })
    } else {
        form.reportValidity();
    }
}