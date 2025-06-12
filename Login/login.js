const InputUsername = document.getElementById("username");
const InputPassword = document.getElementById("password");
const formLogin = document.getElementById("formLogin");

const loginUser = "https://investtrack-api.onrender.com/user/login";

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const login = {
    username: InputUsername.value,
    password: InputPassword.value,
  };

  if (InputUsername.value === "" || InputPassword.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios",
      text: "Todos os campos precisam ser preenchidos!",
    });
    return;
  }

  try {
    const res = await fetch(loginUser, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Erro ao efetuar o login",
        text: "Verifique seus dados e tente novamente.",
      });
      return;
    }

    const data = await res.json();

    sessionStorage.setItem("tokenInvestTrack", data.access_token);
    sessionStorage.setItem("usernameInvestTrack", InputUsername.value);

    Swal.fire({
      icon: "success",
      title: "Login realizado",
      text: "Você será redirecionado em instantes.",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      const tickerParaFavoritar = sessionStorage.getItem("acaoParaFavoritar");

      if (tickerParaFavoritar) {
        sessionStorage.setItem("favoritarAposLogin", "true");
        sessionStorage.removeItem("acaoParaFavoritar");

        window.location.href = `/pesquisar.html?${tickerParaFavoritar}`;
      } else {
        window.location.href = "/index.html";
      }
    });

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    Swal.fire({
      icon: "error",
      title: "Erro inesperado",
      text: "Ocorreu um erro. Tente novamente mais tarde.",
    });
  }
});
