import React from 'react';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

// Mock de dados de skills
const skills = [
  { name: 'React', category: 'Frontend', level: 95, history: [70, 80, 90, 95] },
  { name: 'TypeScript', category: 'Frontend', level: 90, history: [60, 75, 85, 90] },
  { name: 'Node.js', category: 'Backend', level: 80, history: [50, 65, 75, 80] },
  { name: 'Tailwind CSS', category: 'Frontend', level: 85, history: [40, 60, 80, 85] },
  { name: 'PostgreSQL', category: 'Banco de Dados', level: 70, history: [30, 50, 60, 70] },
  { name: 'MongoDB', category: 'Banco de Dados', level: 65, history: [20, 40, 55, 65] },
  { name: 'GraphQL', category: 'Backend', level: 60, history: [10, 30, 50, 60] },
  { name: 'CI/CD', category: 'DevOps', level: 75, history: [20, 40, 60, 75] },
];

const radarData = {
  labels: skills.map((s) => s.name),
  datasets: [
    {
      label: 'Nível Atual',
      data: skills.map((s) => s.level),
      backgroundColor: 'rgba(0,210,223,0.2)',
      borderColor: '#00d2df',
      pointBackgroundColor: '#00d2df',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00d2df',
    },
  ],
};

const lineData = {
  labels: ['2021', '2022', '2023', '2024'],
  datasets: skills.map((s) => ({
    label: s.name,
    data: s.history,
    fill: false,
    borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
    tension: 0.3,
  })),
};

export const SkillsMap: React.FC = () => (
  <section className="w-full max-w-3xl py-12 mx-auto">
    <h2 className="mb-8 text-3xl font-bold text-center text-modern-accent">Mapa de Habilidades</h2>
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-xl font-semibold text-modern-accent2">Radar de Skills</h3>
        <Radar data={radarData} options={{
          scales: { r: { min: 0, max: 100, pointLabels: { font: { size: 14 } } } },
          plugins: { legend: { display: false } },
        }} />
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold text-modern-accent2">Evolução ao Longo do Tempo</h3>
        <Line data={lineData} options={{
          scales: { y: { min: 0, max: 100 } },
          plugins: { legend: { display: true, position: 'bottom' } },
        }} />
      </div>
    </div>
  </section>
);

export default SkillsMap; 