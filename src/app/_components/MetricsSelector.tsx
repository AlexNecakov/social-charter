import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface MetricsSelectorProps {
    platform: 'meta' | 'tiktok';
    onChange: (metrics: string[]) => void;
}

const METRICS = {
    meta: ['spend', 'impressions', 'clicks', 'ctr', 'cpc', 'reach', 'frequency', 'conversions', 'cost_per_conversion', 'conversion_rate', 'actions', 'cost_per_action_type'],
    tiktok: ['spend', 'impressions', 'clicks', 'conversions', 'cost_per_conversion', 'conversion_rate', 'ctr', 'cpc', 'reach', 'frequency', 'skan_app_install', 'skan_cost_per_app_install', 'skan_purchase', 'skan_cost_per_purchase']
};

export function MetricsSelector({ platform, onChange }: MetricsSelectorProps) {
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

    const handleChange = (value: string) => {
        const newSelection = selectedMetrics.includes(value)
            ? selectedMetrics.filter(metric => metric !== value)
            : [...selectedMetrics, value];
        setSelectedMetrics(newSelection);
        onChange(newSelection); // Pass back to parent
    };

    return (
        <div>
            <Select onValueChange={handleChange} multiple>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Metrics" />
                </SelectTrigger>
                <SelectContent>
                    {METRICS[platform].map((metric) => (
                        <SelectItem key={metric} value={metric}>{metric}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p>Selected Metrics: {selectedMetrics.join(', ')}</p>
        </div>
    );
}
