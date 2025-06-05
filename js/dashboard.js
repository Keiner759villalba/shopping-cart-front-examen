   const TOKEN =  localStorage.getItem('token');

   if(!TOKEN){
    location.href = '/index.html';
   }