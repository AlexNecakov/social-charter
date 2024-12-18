import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    data: Array<{
        spend: string;
        date_start: string;
        date_stop: string;
        impressions: string;
        clicks: string;
        ctr: string;
        cpc: string;
        reach: string;
        frequency: string;
        conversions: string;
        cost_per_conversion: string;
        conversion_rate: string;
        actions: string;
        cost_per_action_type: string;
        skan_app_install: string;
        skan_cost_per_app_install: string;
        skan_purchase: string;
        skan_cost_per_purchase: string;
    }>;
}

export const ChartComponent: React.FC<ChartProps> = ({ data }) => {
    // Define the metric names you want to chart
    const metrics = [
        'spend', 'impressions', 'clicks', 'ctr', 'cpc', 'reach', 'frequency',
        'conversions', 'cost_per_conversion', 'conversion_rate', 'actions',
        'cost_per_action_type', 'skan_app_install', 'skan_cost_per_app_install',
        'skan_purchase', 'skan_cost_per_purchase'
    ];

    // Function to generate datasets for the given metrics, excluding null values
    const generateDataset = (label: string, color: string) => {
        const dataPoints = data.map(item => {
            const value = parseFloat(item[label]);
            return isNaN(value) || value === null ? null : value; // Skip null or NaN values
        });

        // If all values are null, don't include the dataset
        if (dataPoints.every(value => value === null)) {
            return null;
        }

        return {
            label,
            data: dataPoints, // Include only valid data
            fill: false,
            borderColor: color,
            tension: 0.1,
        };
    };

    // Colors for different metrics (you can customize these)
    const colors = {
        spend: 'rgb(75, 192, 192)',
        impressions: 'rgb(255, 99, 132)',
        clicks: 'rgb(54, 162, 235)',
        ctr: 'rgb(255, 159, 64)',
        cpc: 'rgb(153, 102, 255)',
        reach: 'rgb(255, 205, 86)',
        frequency: 'rgb(201, 203, 207)',
        conversions: 'rgb(120, 160, 80)',
        cost_per_conversion: 'rgb(200, 100, 50)',
        conversion_rate: 'rgb(30, 200, 50)',
        actions: 'rgb(100, 150, 200)',
        cost_per_action_type: 'rgb(200, 150, 100)',
        skan_app_install: 'rgb(100, 50, 255)',
        skan_cost_per_app_install: 'rgb(0, 255, 255)',
        skan_purchase: 'rgb(255, 0, 255)',
        skan_cost_per_purchase: 'rgb(255, 150, 150)',
    };

    // Prepare chart data: Multiple datasets (from metrics)
    const chartData = {
        labels: data.map(item => item.date_start), // x-axis (use 'date_start' as labels)
        datasets: metrics.map(metric => {
            const dataset = generateDataset(metric, colors[metric] || 'rgb(0,0,0)');
            return dataset; // Only return non-null datasets
        }).filter(dataset => dataset !== null), // Remove any null datasets
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default ChartComponent;

