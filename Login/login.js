
const InputUsername = document.getElementById("username");
const InputPassword = document.getElementById("password");
const formLogin = document.getElementById("formLogin");

const loginUser = "https://investtrack-api.onrender.com/user/login";
// token é apenas usado para os favoritos e toda vez que se faz um login é criado um token temporário

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const login = {
    username: InputUsername.value,
    password: InputPassword.value,
  };

  console.log(login);

  if (InputUsername.value == "" || InputPassword.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios",
      text: "Todos os campos precisam ser preenchidos!",
    });
  }

  const res = await fetch(loginUser, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  });

  console.log(res);

  if (!res.ok) {
    Swal.fire({
      icon: "error",
      title: "Erro ao efetuar o login",
      text: "Verifique seus dados e tente novamente.",
    });
    console.log(Error);
  } else {
    Swal.fire({
      icon: "success",
      title: "Login realizado",
      text: "Você será redirecionado em instantes.",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "/index.html";
    });
  }
});
