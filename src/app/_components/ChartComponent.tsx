import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    data: Array<{ spend: string; date_start: string; date_stop: string; /* other fields */ }>;
}

export const ChartComponent: React.FC<ChartProps> = ({ data }) => {
    // Assuming you want to plot 'spend' over time, using 'date_start' as the label
    const chartData = {
        labels: data.map(item => item.date_start), // or item.date_stop if more appropriate
        datasets: [{
            label: 'Spend',
            data: data.map(item => parseFloat(item.spend)), // Convert string to number
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Line data={chartData} options={options} />
    );
};
