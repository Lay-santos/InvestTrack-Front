const btnAtualizar = document.querySelector("#btnAtualizar");

btnAtualizar.addEventListener("click", () => {
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

    Swal.fire({
        icon: "success",
        title: "Senha alterada com sucesso",
        text: "Sua senha foi alterada com sucesso, ",
    });


});