const InputEmail = document.getElementById("email")
const InputPassword = document.getElementById("password")
const formLogin = document.getElementById("formLogin")

const loginUser = "https://investtrack-api.onrender.com/user/login"
// token é apenas usado para os favoritos e toda vez que se faz um login é criado um token temporário 

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault()

    const login = {
        email: InputEmail.value,
        password: InputPassword.value
    }


    if (InputEmail == "" || InputPassword == "") {
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
        alert("Erro ao efetuar o login")
        console.log(Error);

    } else {

        const data = await res.text();
        console.log(data)
        sessionStorage.setItem("tokenInvestTrack", data)
        alert("O login foi realizado com sucesso")
        window.location.href = "index.html"

    }

})
