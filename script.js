const API_URL = "https://investtrack-api.onrender.com/acoes/";
const ctx = document.getElementById('stockChart').getContext('2d');

const ticker = window.location.search.replace("?", "");
let arrayPrices = [];
let arrayDates = [];

selecionaAcao();

function selecionaAcao() {
  fetch(`${API_URL}${ticker}`)
  .then(res => res.json())
  .then((objAcao) => populaTela(objAcao))
  .catch((error) => {
      Swal.fire({
        title: "Ação não encontrada",
        text: "Ação não foi encontrada, retornando a tela inicial...",
        icon: "error",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 3500
      })
      .then(() => window.location.href = "/index.html")
        
      
    });
}

function populaTela(objAcao) {
  populaInfoEmpresa(objAcao);

  console.log(objAcao.historicalDataPrice);

  if(ticker.endsWith("F") || objAcao.historicalDataPrice.length < 3){
    Swal.fire({
        title: "Ação sem gráfico",
        text: `Essa ação não contém gráfico, por ${ticker.endsWith("F") ? "ser uma fração de ação" : "não ter dados suficientes na base"}`,
        icon: "info",
        allowOutsideClick: true,
        allowEscapeKey: true,
      })
      return;
  }
  populaInfoGrafico(objAcao);

}

function populaInfoEmpresa(objAcao) {
  document.querySelector("#tickerName").innerText = objAcao.symbol;
  document.querySelector("#tickerLogo").src = objAcao.logourl;
  document.querySelector("#infoMoney").innerText = `${objAcao.currency}`
  document.querySelector(".price").innerHTML = `<span id="regularMarketPrice">${objAcao.regularMarketPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`
  if (objAcao.regularMarketChangePercent < 0) {
    document.querySelector("#regularMarketPrice").classList.add("attention");
    document.querySelector("#change").classList.remove("positive");
    document.querySelector("#change").classList.add("negative");
  }
  document.querySelector("#longNameTicker").innerHTML = `${objAcao.longName || objAcao.shortName || ""}`;
  document.querySelector("#marketCapTicker").innerHTML = `<strong>Capitalização de mercado:</strong> ${objAcao.marketCap.toLocaleString()}`;
  document.querySelector("#marketVolumeTicker").innerHTML = `<strong>Volume de mercado:</strong> ${objAcao.regularMarketVolume.toLocaleString()}`;
  document.querySelector("#maxDayPrice").innerHTML = `<strong>Máxima do dia:</strong> <span class="positive">${objAcao.regularMarketDayHigh.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`
  document.querySelector("#minDayPrice").innerHTML = `<strong>Mínima do dia:</strong> <span class="negative">${objAcao.regularMarketDayLow.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`
}

function populaInfoGrafico(objAcao) {
  document.querySelector("#change").innerHTML = `${objAcao.regularMarketChangePercent > 0 ? "+" : ""}${objAcao.regularMarketChangePercent}%`;
  document.querySelector(".prev-price").innerHTML = `${(objAcao.regularMarketPrice - objAcao.regularMarketChange).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

  const arrayDataPrices = objAcao.historicalDataPrice;

  arrayDataPrices.forEach(obj => {
    arrayPrices.push(obj.open);
    arrayPrices.push(obj.high);
    arrayPrices.push(obj.low);
    arrayPrices.push(obj.close);

    let datePrice = new Date(obj.date * 1000);

    arrayDates.push(`${datePrice.getDate()}/${datePrice.getMonth()}/${datePrice.getFullYear()}`);
  });
}

const stockChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: arrayDates,
    datasets: [{
      label: 'Preço',
      data: arrayPrices,
      borderColor: '#58a6ff',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 5

    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    hover: {
      intersect: false
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  }
});