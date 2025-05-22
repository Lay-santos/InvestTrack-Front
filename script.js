const API_URL = "http://localhost:8080/acoes/";
const ctx = document.getElementById('stockChart').getContext('2d');

const ticker = window.location.search.replace("?", "");

selecionaAcao();

function selecionaAcao (){
   fetch(`${API_URL}${ticker}`)
   .then(res => res.json())
   .then((objAcao) => {
      document.querySelector("#tickerName").innerText = objAcao.symbol;
      document.querySelector("#tickerLogo").src = objAcao.logourl;
   });
}
const stockChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Preço',
      data: [5.1050, 5.1070, 5.1100, 5.1080, 5.1090, 5.1065, 5.1083],
      borderColor: '#58a6ff',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 0,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
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