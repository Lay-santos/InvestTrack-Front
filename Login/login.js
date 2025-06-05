const InputUsername = document.getElementById("username")
const InputPassword = document.getElementById("password")
const formLogin = document.getElementById("formLogin")

const loginUser = "http://localhost:8080/user/login"
// token é apenas usado para os favoritos e toda vez que se faz um login é criado um token temporário 

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault()

    const login = {
        username: InputUsername.value,
        password: InputPassword.value
    }

    console.log(login)


    if (InputUsername.value == "" || InputPassword.value == "") {
        alert("Todos os campos precisão ser preenchidos")
        return
    }

    const res = await fetch(loginUser, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
    })

    console.log(res)

    if (!res.ok) {
        alert("Erro ao efetuar o login " + res)
        console.log(Error);

    } else {

 const data = await res.json();
sessionStorage.setItem("tokenInvestTrack", data.access_token);
sessionStorage.setItem("usernameInvestTrack", InputUsername.value); // salva o username
alert("O login foi realizado com sucesso");
window.location.href = "/index.html";


    }

})
