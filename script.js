const ctx = document.getElementById('stockChart').getContext('2d');

const stockChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    datasets: [{
      label: 'Preço',
      data: [1.5, 5.1070, 5.1100, 5.1080, 10, 5.1065, 8, 5],
      borderColor: '#58a6ff',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      fill: true,
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
    interaction: {
      mode: 'index', 
      intersect: false
    },
    scales: {
      x: {
        display: true
      },
      y: {
        display: false
      }
    }
  }
});