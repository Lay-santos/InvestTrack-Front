const API_URL = "https://investtrack-api.onrender.com/api/password/forgot";
const enviarEmailBtn = document.querySelector("#enviarEmailBtn");


enviarEmailBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector("#emailInput").value;
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    })
        .then((data) => {
            console.log(data);
            if (data.ok) {
                Swal.fire({
                    icon: "success",
                    title: "E-mail enviado",
                    text: "Verifique seu email para fazer a atualização da senha",
                    timer: 5000
                }).then(() => window.location.href = "/Login/login.html");
            }else{
                Swal.fire({
                icon: "error",
                title: "Não foi possível enviar o email",
                text: "Email não cadastrado",
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



