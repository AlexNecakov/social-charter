import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const TIKTOK_DIMENSIONS = ['ad_id', 'campaign_id', 'adgroup_id', 'advertiser_id', 'stat_time_day', 'campaign_name', 'adgroup_name', 'ad_name', 'country_code', 'age', 'gender', 'province_id', 'dma_id'];

interface DimensionsSelectorProps {
    onChange: (dimensions: string[]) => void;
}

export function DimensionsSelector({ onChange }: DimensionsSelectorProps) {
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);

    const handleChange = (value: string) => {
        const newSelection = selectedDimensions.includes(value)
            ? selectedDimensions.filter(breakdown => breakdown !== value)
            : [...selectedDimensions, value];
        setSelectedDimensions(newSelection);
        onChange(newSelection); // Pass back to parent
    };

    return (
        <div>
            <Select onValueChange={handleChange} multiple>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Dimensions" />
                </SelectTrigger>
                <SelectContent>
                    {TIKTOK_DIMENSIONS.map((dimension) => (
                        <SelectItem key={dimension} value={dimension}>{dimension}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p>Selected Dimensions: {selectedDimensions.join(', ')}</p>
        </div>
    );
}
