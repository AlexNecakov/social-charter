'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../lib/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
import { PlatformSelector } from './_components/PlatformSelector';
import { MetricsSelector } from './_components/MetricsSelector';
import { BreakdownsSelector } from './_components/BreakdownsSelector';
import { DimensionsSelector } from './_components/DimensionsSelector';
import { DateRangeSelector } from './_components/DateRangeSelector';
import { LevelSelector } from './_components/LevelSelector';
import { TimeIncrementSelector } from './_components/TimeIncrementSelector';
import { FetchButton } from './_components/FetchButton';
import { Alert } from '~/components/ui/alert';
import { ChartComponent } from './_components/ChartComponent';

const Home = () => {
    const [platform, setPlatform] = useState<'meta' | 'tiktok'>('meta');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);
    const [metricsState, setMetricsState] = useState<string[]>(['spend']);
    const [dimensionsState, setDimensionsState] = useState<string[]>([]);
    const [breakdownsState, setBreakdownsState] = useState<string[]>(["age"]);
    const [levelState, setLevelState] = useState<string>('account');
    const [timeIncrementState, setTimeIncrementState] = useState<string>('all_days');
    const [dateRangeEnumState, setDateRangeEnumState] = useState<string>('lifetime');
    const [dateRangeState, setDateRangeState] = useState<{ from: Date; to: Date } | null>(null);

    const handleFetchData = async () => {
        const parameters = {
            metrics: metricsState, // from MetricsSelector
            level: levelState, // from LevelSelector
            breakdowns: breakdownsState,  // from BreakdownsSelector
            timeIncrement: timeIncrementState ? timeIncrementState : undefined, // from TimeIncrementSelector
            dateRangeEnum: dateRangeEnumState ? dateRangeEnumState : undefined, // from DateRangeSelector if preset is chosen
            dateRange: dateRangeState ? {
                from: dateRangeState.from.toISOString().split('T')[0],
                to: dateRangeState.to.toISOString().split('T')[0]
            } : undefined // from DateRangeSelector if custom range is chosen
        };

        setLoading(true);
        try {
            const result = await fetchData(platform, parameters);
            setData(result.data);
            console.log(result.data)
        } catch (error) {
            setError(`Failed to fetch data: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <PlatformSelector onChange={setPlatform} />
            <MetricsSelector platform={platform} />
            {platform === 'meta' ? <BreakdownsSelector /> : <DimensionsSelector />}
            <LevelSelector platform={platform} />
            <DateRangeSelector />
            {platform === 'meta' && <TimeIncrementSelector />}
            <FetchButton onClick={handleFetchData} />
            {loading && <div>Loading...</div>}
            {error && <Alert variant="destructive">{error}</Alert>}
            {data && Array.isArray(data) && <ChartComponent data={data} />}
        </div>
    );
};

export default Home;
