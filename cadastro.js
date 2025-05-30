const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const passwordConfirm = document.getElementById("passwordConfirm")
const form= document.getElementById("formCadastro")

const cadastroUser = "http://localhost:8080/user/"


form.addEventListener("submit",async function(event) { 
    event.preventDefault()
    console.log("qualquer");
if (nameInput == ""|| emailInput==""||passwordInput=="") {
        alert("Todos os campos precisão ser preenchidos")
        return
    } 

    if (passwordInput.value != passwordConfirm.value) {
        alert("As senhas devem serem iguais")
        return
    }
    const usuario = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }


    const response = await fetch(cadastroUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })

    if (!response.ok) {
        alert("Ocorreu um erro ao criar um usuario")
        return
    } else {
        alert("usuario criado com sucesso!")

    }

    window.location.href = "login.html"
})
   
