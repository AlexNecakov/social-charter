import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const DATE_RANGES = ['last7', "last14", "last30", "lifetime"];

interface DateRangeSelectorProps {
    onChange: (value: string) => void;
}

export function DateRangeSelector({ onChange }: DateRangeSelectorProps) {
    return (
        <Select onValueChange={(value) => onChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
                {DATE_RANGES.map((increment) => (
                    <SelectItem key={increment} value={increment}>{increment}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
