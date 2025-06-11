const btnAtualizar = document.querySelector("#btnAtualizar");
const API_URL = "https://investtrack-api.onrender.com/api/password/reset";



btnAtualizar.addEventListener("click", (event) => {
    event.preventDefault();
    const token = window.location.search.replace("?", "").split("=")[1];
    let senha = document.querySelector("#senha1").value;
    let senha2 = document.querySelector("#senha2").value;

    if (senha1 !== senha2) {
        Swal.fire({
            icon: "error",
            title: "Senhas não coincidem",
            text: "As senhas precisam ser exatamente iguais, tente novamente.",
        });
        return;
    }

    if(token == ""){
        Swal.fire({
            icon: "error",
            title: "URL inválida",
            text: "A URL é inválida, tente enviar outro email",
        });
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({token: token, newPassword: senha})
    })
    .then((res) => res.json())
    .then(data => {
        if(data.ok){
            Swal.fire({
            icon: "success",
            title: "Senha alterada com sucesso",
            text: "Sua senha foi alterada com sucesso",
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Ocorreu um erro",
            text: "Ocorreu um erro:" + error,
            });
    })
});