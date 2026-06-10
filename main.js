// Ativação do plugin do GSAP
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. ANCORAGEM SUAVE DO BOTÃO HERO
// ==========================================
document.getElementById('startJourney').addEventListener('click', () => {
  document.getElementById('scrollytelling').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// ==========================================
// 2. SCROLLYTELLING HORIZONTAL (GSAP)
// ==========================================
const sections = gsap.utils.toArray('.section');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#scrollytelling",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.getElementById('scrollytelling').offsetWidth
  }
});

// ==========================================
// 3. INICIALIZAÇÃO DE TODOS OS GRÁFICOS
// ==========================================

// Configurações Globais de Cores para o Modo Escuro dos gráficos internos
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(148, 163, 184, 0.1)';

// Gráfico 1: Umidade do Solo (Painel Escuro do GSAP)
const soilCtx = document.getElementById('soilChart').getContext('2d');
new Chart(soilCtx, {
  type: 'line',
  data: {
    labels: ['06:00', '12:00', '18:00', '00:00'],
    datasets: [{
      label: 'Nível Crítico de Umidade %',
      data: [68, 42, 59, 71],
      borderColor: '#34d399',
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } }
  }
});

// Gráfico 2: Sensores de Água (Card Central da Vitrine)
const waterCtx = document.getElementById('waterChart').getContext('2d');
new Chart(waterCtx, {
  type: 'bar',
  data: {
    labels: ['Desperdício (Pivô Padrão)', 'Consumo Inteligente'],
    datasets: [{
      label: 'Consumo por Hectare (Litros)',
      data: [2800, 1450],
      backgroundColor: ['#ef4444', '#3b82f6'],
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } } }
  }
});

// Gráfico 3: Simulador Radar (Seção de Decisões)
const radarCtx = document.getElementById('radarChart').getContext('2d');

let radarData = {
  labels: ['Produtividade por Ha', 'Eficiência de Recursos', 'Conservação Biológica', 'Margem de Lucro'],
  datasets: [{
    label: 'Status Atual da Fazenda',
    data: [50, 50, 50, 50],
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderColor: '#34d399',
    borderWidth: 2,
    pointBackgroundColor: '#34d399'
  }]
};

let radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: radarData,
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      r: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false }
      }
    }
  }
});

// Interações do Simulador
document.getElementById('conventionalBtn').addEventListener('click', () => {
  radarChart.data.datasets[0].label = 'Prática Convencional';
  radarChart.data.datasets[0].data = [85, 25, 20, 45]; 
  radarChart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.2)';
  radarChart.data.datasets[0].borderColor = '#ef4444';
  radarChart.data.datasets[0].pointBackgroundColor = '#ef4444';
  radarChart.update();
});

document.getElementById('sustainableBtn').addEventListener('click', () => {
  radarChart.data.datasets[0].label = 'Solução AgroForte';
  radarChart.data.datasets[0].data = [92, 90, 85, 88]; 
  radarChart.data.datasets[0].backgroundColor = 'rgba(16, 185, 129, 0.3)';
  radarChart.data.datasets[0].borderColor = '#10b981';
  radarChart.data.datasets[0].pointBackgroundColor = '#10b981';
  radarChart.update();
});