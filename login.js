const formLogin = document.getElementById("formLogin")
const loginUser = "http://localhost:8080/user/login"
// token é apenas usado para os favoritos e toda vez que se faz um login é criado um token temporário 

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault()

    const InputEmail = document.getElementById("email").value
    const InputPassword = document.getElementById("password").value

    if (InputEmail == ""|| InputPassword=="") {
        alert("Todos os campos precisão ser preenchidos")
        return
    } 

    const res = await fetch(loginUser,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({InputEmail, InputPassword})
    })

     if (!res.ok) {
        alert("Erro ao efetuar o login")
        console.log(Error);
        
        return
    }

    const data = await res.json();
    sessionStorage.setItem("tokenInvestTrack", data.token)
    alert("O login foi realizado com sucesso")


})