import { Bar } from 'react-chartjs-2';

interface ChartProps {
    data: Array<{
        // dimensions
        ad_id: string;
        campaign_id: string;
        adgroup_id: string;
        advertiser_id: string;
        stat_time_day: string;
        campaign_name: string;
        adgroup_name: string;
        ad_name: string;
        country_code: string;
        age: string;
        gender: string;
        province_id: string;
        dma_id: string;
        country: string;
        region: string;
        dma: string;
        impression_device: string;
        platform_position: string;
        publisher_platform: string;

        // date
        date_start: string;
        date_stop: string;

        // metrics
        spend: string;
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

    // Define the dimensions
    const dimensions = [
        'ad_id', 'campaign_id', 'adgroup_id', 'advertiser_id',
        'stat_time_day', 'campaign_name', 'adgroup_name', 'ad_name',
        'country_code', 'age', 'gender', 'province_id', 'dma_id',
        'country', 'region', 'dma', 'impression_device', 'platform_position', 'publisher_platform'
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
            fill: true, // Set fill to true to color the bars
            backgroundColor: color, // Set the bar color
            borderColor: color, // Optional: set border color as well
            borderWidth: 1, // Optional: set border width for clarity
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
        // Use the first non-null dimension field as the x-axis labels
        labels: data.map(item => {
            // Iterate through the dimensions and return the first non-null value
            for (const dimension of dimensions) {
                const value = item[dimension];
                if (value && value !== '') {
                    return value;
                }
            }
            return 'Unknown'; // Default if all dimension fields are null or empty
        }),

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
        plugins: {
            tooltip: {
                callbacks: {
                    // Customizing the tooltip label
                    label: (tooltipItem) => {
                        const { datasetIndex, dataIndex } = tooltipItem;
                        const metricLabel = chartData.datasets[datasetIndex].label;
                        const metricValue = tooltipItem.raw;

                        // Access the dimension data for the specific data point
                        const dimension = data[dataIndex];

                        // Find the first non-null dimension value for the tooltip
                        const dimensionLabel = Object.keys(dimension)
                            .map((key) => (dimension[key] && key !== 'date_start' && key !== 'date_stop' ? `${key}: ${dimension[key]}` : ''))
                            .filter(Boolean)
                            .join(', ') || 'No dimension data';

                        return `${metricLabel}: ${metricValue} (${dimensionLabel})`;
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default ChartComponent;

