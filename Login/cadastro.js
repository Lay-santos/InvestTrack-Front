const nameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const passwordConfirm = document.getElementById("passwordConfirm")
const form = document.getElementById("formCadastro")

const cadastroUser = "https://investtrack-api.onrender.com/user/"


form.addEventListener("submit",async function(event) { 
    event.preventDefault()
if (nameInput.value == ""|| emailInput.value==""||passwordInput.value=="") {
        alert("Todos os campos precisão ser preenchidos")
        return
    } 

    if (passwordInput.value != passwordConfirm.value) {
        alert("As senhas devem serem iguais")
        return
    }
    const usuario = {
        username: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    console.log(usuario);
    const response = await fetch(cadastroUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })

    console.log(response);

    if (!response.ok) {
        alert("Ocorreu um erro ao criar o usuario " + response)
        return
    } else {
        alert("usuario criado com sucesso!")

    }

    window.location.href = "login.html"
})
   
