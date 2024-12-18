import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const META_BREAKDOWNS = ['age', 'gender', 'country', 'region', 'dma', 'impression_device', 'platform_position', 'publisher_platform'];

interface BreakdownsSelectorProps {
    onChange: (breakdowns: string[]) => void;
}

export function BreakdownsSelector({ onChange }: BreakdownsSelectorProps) {
    const [selectedBreakdowns, setSelectedBreakdowns] = useState<string[]>([]);

    const handleChange = (value: string) => {
        const newSelection = selectedBreakdowns.includes(value)
            ? selectedBreakdowns.filter(breakdown => breakdown !== value)
            : [...selectedBreakdowns, value];
        setSelectedBreakdowns(newSelection);
        onChange(newSelection); // Pass back to parent
    };

    return (
        <div>
            <Select onValueChange={handleChange} multiple>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Breakdowns" />
                </SelectTrigger>
                <SelectContent>
                    {META_BREAKDOWNS.map((breakdown) => (
                        <SelectItem key={breakdown} value={breakdown}>{breakdown}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p>Selected Breakdowns: {selectedBreakdowns.join(', ')}</p>
        </div>
    );
}
