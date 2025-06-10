// Variáveis globais
let token = null;
let nomeUsuario = null;

function carregarCredenciais() {
  token = sessionStorage.getItem("tokenInvestTrack");
  nomeUsuario = sessionStorage.getItem("usernameInvestTrack");
  return token !== null;
}

function mostrarNomeUsuario() {
  if (!carregarCredenciais()) return;
  
  const secaoUsuario = document.querySelector(".user h2");
  if (nomeUsuario && secaoUsuario) {
    secaoUsuario.textContent = `Olá, ${nomeUsuario}!`;
  }
}

async function carregarFavoritos() {
  const secaoFavoritos = document.querySelector(".favoritos");
  if (!secaoFavoritos) return;

  if (!carregarCredenciais()) {
    secaoFavoritos.innerHTML = "<p>Faça login para ver seus favoritos</p>";
    return;
  }

  try {
    secaoFavoritos.innerHTML = "<p>Carregando seus favoritos...</p>";
    
    const resposta = await fetch("https://investtrack-api.onrender.com/favoritos", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!resposta.ok) throw new Error("Erro ao buscar favoritos");
    
    const favoritos = await resposta.json();
    exibirFavoritos(favoritos, secaoFavoritos);
    
  } catch (erro) {
    console.error("Erro ao carregar favoritos:", erro);
    secaoFavoritos.innerHTML = `
      <p>Erro ao carregar favoritos.</p>
      <button onclick="carregarFavoritos()">Tentar novamente</button>
    `;
  }
}

async function exibirFavoritos(favoritos, container) {
  if (!favoritos || !favoritos.length) {
    container.innerHTML = "<p>Você não tem ações favoritas ainda.</p>";
    return;
  }

  container.innerHTML = "";
  
  for (const ticker of favoritos) {
    try {
      const resposta = await fetch(`https://investtrack-api.onrender.com/acoes/${ticker}`);
      if (!resposta.ok) continue;
      
      const acao = await resposta.json();
      const card = criarCardAcao(acao);
      container.appendChild(card);
    } catch (erro) {
      console.error(`Erro ao carregar ${ticker}:`, erro);
      const card = document.createElement("div");
      card.classList.add("cards");
      card.innerHTML = `<h4>${ticker}</h4><p>Não foi possível carregar os dados</p>`;
      container.appendChild(card);
    }
  }
}

function criarCardAcao(acao) {
  const card = document.createElement("div");
  card.classList.add("cards");
  card.innerHTML = `
    <h4>${acao.symbol}</h4>
    <p>${acao.longName || acao.shortName || "Nome indisponível"}</p>
    <p>Último preço: ${acao.regularMarketPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</p>
  `;
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    window.location.href = `pesquisar.html?${acao.symbol}`;
  });
  return card;
}

async function verificarFavorito() {
  const coracaoFavorito = document.getElementById("favHeart");
  if (!coracaoFavorito || !carregarCredenciais()) {
    if (coracaoFavorito) coracaoFavorito.style.display = "none";
    return;
  }

  const ticker = obterTickerAtual();
  if (!ticker) return;

  try {
    const resposta = await fetch("https://investtrack-api.onrender.com/favoritos", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (resposta.ok) {
      const favoritos = await resposta.json();
      coracaoFavorito.classList.toggle("favorited", favoritos.includes(ticker));
      coracaoFavorito.style.display = "block";
    }
  } catch (erro) {
    console.error("Erro ao verificar favorito:", erro);
  }
}

async function alternarFavorito() {
  if (!carregarCredenciais()) {
    Swal.fire({
      title: "Ação não favoritada",
      text: "Você precisa estar logado para favoritar ações.",
      icon: "warning",
      confirmButtonText: "Fazer login"
    }).then(() => {
      window.location.href = "Login/login.html";
    });
    return;
  }

  const coracaoFavorito = document.getElementById("favHeart");
  if (!coracaoFavorito) return;

  const ticker = obterTickerAtual();
  if (!ticker) {
    Swal.fire({
      title: "Ticker não identificado",
      text: "Não foi possível identificar a ação.",
      icon: "error"
    });
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

    if (resposta.ok) {
      coracaoFavorito.classList.toggle("favorited", !estaFavoritado);

      if (!estaFavoritado) {
        Swal.fire({
          title: "Favoritado!",
          text: `A ação ${ticker} foi adicionada aos seus favoritos.`,
          icon: "success",
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          title: "Removido!",
          text: `A ação ${ticker} foi removida dos seus favoritos.`,
          icon: "info",
          confirmButtonText: "OK"
        }).then(() => {
          if (window.location.pathname.includes("pesquisar.html")) {
            window.location.href = "favoritos.html";
          }
        });
      }
    } else {
      throw new Error("Erro na requisição");
    }
  } catch (erro) {
    console.error("Erro ao atualizar favoritos:", erro);
    Swal.fire({
      title: "Erro ao atualizar favoritos",
      text: "Tente novamente mais tarde.",
      icon: "error"
    });
  }
}



function obterTickerAtual() {
  const url = window.location.href;
  const ticker = url.split('?')[1];
  
  if (ticker) return ticker;
  
  const elemento = document.getElementById("tickerName");
  return elemento?.textContent.trim();
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".favoritos")) {
    mostrarNomeUsuario();
    carregarFavoritos();
  }
  
  if (document.getElementById("favHeart")) {
    verificarFavorito();
    document.getElementById("favHeart").addEventListener("click", alternarFavorito);
  }
});