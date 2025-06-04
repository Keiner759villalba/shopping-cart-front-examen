document.addEventListener('DOMContentLoaded', () =>{
    formulario();
})
function formulario(){
    const loginFormulario = document.getElementById('formLogin').addEventListener('submit', (e) =>{
        e.preventDefault();
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('password').value;
        login(userName, password)
    })
}
function login(userName, password){
    
   
    
    
    const credentials = { username: userName, password: password };
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then((response) => {
        
        if(response.status === 200){
            response.json()
            
                .then(data => {  
                    console.log('Responde bien:', data);
                    alertType = 'success';
                    message = 'Bienvenido'; 
                    alertBuilder(alertType, message);
                    
                        localStorage.setItem('token', data.token)
                    
                    setTimeout (() =>{
                        location.href = '../admin/dashboard.html';
                    }, 2000)
                });
        } else {
            alertType = 'danger';
            message = 'Datos erróneos';
            alertBuilder(alertType, message);
        }
    })
    .catch((error) => {
        alertType = 'danger';
        message = 'Error inesperado';
        console.log(error);
    });
}

function alertBuilder(alertType, message){
    const mensajeFinal = document.getElementById('alert');
    mensajeFinal.className = '';
    mensajeFinal.classList.add(`alert`, `alert-${alertType}`, `alert-dismissible`, `fade`, `show`);
    mensajeFinal.textContent = message;
}
        
function logout(){
    localStorage.removeItem('token');
    location.href = '../index.html';
}