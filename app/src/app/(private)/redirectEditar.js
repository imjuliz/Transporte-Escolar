// const currentURL = window.location.href('/editarPerfil');
// console.log(currentURL);
// function redirect(){
//     location.replace('http://localhost:3001/editarPerfil')
// }
const redirect = async () => {
    try {
        const res = await fetch('http://localhost:3000/editarPerfil', {
            method: 'PATCH',
            body: JSON.stringify({
                "cpf": "12121212121",
                "email": "maria@gmail.com",
                "senha": "maria@adm",
                "tipo": "administrador"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('Erro na requisição:', err);
    }
}

export { redirect }