const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const form = document.getElementById("formCadastro");

const cadastroUser = "https://investtrack-api.onrender.com/user/";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios",
      text: "Todos os campos precisam ser preenchidos!",
    });
    return;
  }

  if (passwordInput.value !== passwordConfirm.value) {
    Swal.fire({
      icon: "warning",
      title: "Senhas diferentes",
      text: "As senhas devem ser iguais!",
    });
    return;
  }

  const usuario = {
    username: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch(cadastroUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Erro ao criar usuário",
        text: "Verifique os dados e tente novamente.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Usuário criado com sucesso!",
      text: "Você será redirecionado para o login.",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "login.html";
    });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    Swal.fire({
      icon: "error",
      title: "Erro inesperado",
      text: "Tente novamente mais tarde.",
    });
  }
});
