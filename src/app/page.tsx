'use client'
import { useState } from 'react';
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
import ReportTypeSelector from './_components/ReportTypeSelector';

const Home = () => {
    const [platform, setPlatform] = useState<'meta' | 'tiktok'>('meta');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);

    // State for parameters based on platform selection
    const [metricsState, setMetricsState] = useState<string[]>([]);
    const [dimensionsState, setDimensionsState] = useState<string[]>([]);
    const [breakdownsState, setBreakdownsState] = useState<string[]>([]);
    const [levelState, setLevelState] = useState<string>('');
    const [timeIncrementState, setTimeIncrementState] = useState<string>('');
    const [dateRangeEnumState, setDateRangeEnumState] = useState<string>('');
    const [dateRangeState, setDateRangeState] = useState<{ from: Date; to: Date } | null>(null);
    const [reportType, setReportType] = useState<string>(''); // for TikTok

    const handleFetchData = async () => {
        const parameters = {
            metrics: metricsState,
            level: levelState,
            breakdowns: platform === 'meta' ? breakdownsState : undefined,
            dimensions: platform === 'tiktok' ? dimensionsState : undefined,
            timeIncrement: platform === 'meta' ? timeIncrementState : undefined,
            dateRangeEnum: dateRangeEnumState || undefined,
            dateRange: dateRangeState ? {
                from: dateRangeState.from.toISOString().split('T')[0],
                to: dateRangeState.to.toISOString().split('T')[0]
            } : undefined,
            reportType: platform === 'tiktok' ? reportType : undefined // Only for TikTok
        };

        setLoading(true);
        try {
            const result = await fetchData(platform, parameters);
            setData(result.data);
            console.log(result.data);
        } catch (error) {
            setError(`Failed to fetch data: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <PlatformSelector onChange={setPlatform} />
            <MetricsSelector platform={platform} onChange={setMetricsState} />
            {platform === 'meta' ? (
                <BreakdownsSelector onChange={setBreakdownsState} />
            ) : (
                <DimensionsSelector onChange={setDimensionsState} />
            )}
            <LevelSelector platform={platform} onChange={setLevelState} />
            <DateRangeSelector
                onSelectDateRange={setDateRangeState}
                onSelectDateRangeEnum={setDateRangeEnumState}
            />
            {platform === 'meta' && <TimeIncrementSelector onChange={setTimeIncrementState} />}
            {platform === 'tiktok' && <ReportTypeSelector onChange={setReportType} />} {/* Add if you have a component for this */}
            <FetchButton onClick={handleFetchData} />
            {loading && <div>Loading...</div>}
            {error && <Alert variant="destructive">{error}</Alert>}
            {data && Array.isArray(data) && <ChartComponent data={data} />}
        </div>
    );
};

export default Home;
