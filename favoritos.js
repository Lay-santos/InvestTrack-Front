document.addEventListener("DOMContentLoaded", () => {
  const coracaoFavorito = document.getElementById("favHeart");
  const secaoFavoritos = document.querySelector(".favoritos");
  const token = sessionStorage.getItem("tokenInvestTrack");

  if (!token) {
    alert("Você precisa estar logado para ver os favoritos.");
    window.location.href = "Login/login.html";
    return;
  }

  // Mostrar nome do usuário na tela (se existir)
  const nomeUsuario = sessionStorage.getItem("usernameInvestTrack");
  const secaoUsuario = document.querySelector(".user h2");
  if (nomeUsuario && secaoUsuario) {
    secaoUsuario.textContent = `Olá, ${nomeUsuario}!`;
  }

  // Função para carregar os favoritos e exibir na tela
  async function carregarFavoritos() {
    if (!secaoFavoritos) return;

    try {
      const resposta = await fetch("https://investtrack-api.onrender.com/favoritos", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!resposta.ok) throw new Error("Erro ao buscar favoritos");
      const favoritos = await resposta.json();

      if (!favoritos.length) {
        secaoFavoritos.innerHTML = "<p>Você não tem ações favoritas ainda.</p>";
        return;
      }

      secaoFavoritos.innerHTML = "";

      for (const tickerFavorito of favoritos) {
        const respostaAcao = await fetch(`https://investtrack-api.onrender.com/acoes/${tickerFavorito}`);
        if (!respostaAcao.ok) continue;
        const acao = await respostaAcao.json();

        const card = document.createElement("div");
        card.classList.add("cards");
        card.innerHTML = `
          <h4>${acao.symbol}</h4>
          <p>${acao.longName || acao.shortName}</p>
          <p>Último preço: ${acao.regularMarketPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        `;
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
          window.location.href = `pesquisar.html?${acao.symbol}`;
        });

        secaoFavoritos.appendChild(card);
      }
    } catch (erro) {
      console.error("Erro ao carregar favoritos:", erro);
      secaoFavoritos.innerHTML = "<p>Erro ao carregar as ações favoritas.</p>";
    }
  }

  // Função para verificar se a ação da página atual está favoritada e atualizar o coração
  async function verificarFavorito() {
    if (!coracaoFavorito) return;

    const ticker = document.getElementById("tickerName")?.innerText;
    if (!ticker) return;

    try {
      const resposta = await fetch("https://investtrack-api.onrender.com/favoritos", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!resposta.ok) throw new Error("Erro ao buscar favoritos");
      const favoritos = await resposta.json();

      if (favoritos.includes(ticker)) {
        coracaoFavorito.classList.add("favorited");
      } else {
        coracaoFavorito.classList.remove("favorited");
      }
    } catch (erro) {
      console.error("Erro ao verificar favorito:", erro);
    }
  }

  // Função para alternar o favorito da ação atual quando clicar no coração
  async function alternarFavorito() {
    if (!coracaoFavorito) return;

    const ticker = document.getElementById("tickerName")?.innerText;
    if (!ticker) {
      alert("Ticker não encontrado para favoritar/desfavoritar.");
      return;
    }

    const estaFavoritado = coracaoFavorito.classList.contains("favorited");
    const metodo = estaFavoritado ? "DELETE" : "POST";

    try {
      const resposta = await fetch(`https://investtrack-api.onrender.com/favoritos/${ticker}`, {
        method: metodo,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar favoritos");

      if (metodo === "POST") {
        coracaoFavorito.classList.add("favorited");
        alert("Ação adicionada aos favoritos!");
      } else {
        coracaoFavorito.classList.remove("favorited");
        alert("Ação removida dos favoritos!");

        // Se estiver na página de detalhes (pesquisar.html), redireciona para favoritos
        if (window.location.pathname.includes("pesquisar.html")) {
          setTimeout(() => {
            window.location.href = "/favoritos.html";
          }, 500); // pequeno delay para mostrar o alert antes de sair
          return;
        }
      }

      carregarFavoritos();

    } catch (erro) {
      console.error("Erro ao atualizar favoritos:", erro);
      alert("Erro ao atualizar favoritos.");
    }
  }

  carregarFavoritos();
  verificarFavorito();

  if (coracaoFavorito) {
    coracaoFavorito.addEventListener("click", alternarFavorito);
  }
});
