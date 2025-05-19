//colocar isso aqui nas páginas com login

// function logout() {
//     sessionStorage.clear(); 
//     window.location.href = "../app/src/app/page.jsx"; // leva pra pagina inicial
//   }
  async function logout() {
    localStorage.removeItem('token');
    window.location.href = '../../app/src/app';
  }


  export {logout};