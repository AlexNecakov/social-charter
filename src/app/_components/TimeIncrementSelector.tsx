import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const TIME_INCREMENTS = ['1', '7', '28', 'monthly', 'quarterly', 'yearly', 'all_days'];

interface TimeIncrementSelectorProps {
    onChange: (value: string) => void;
}

export function TimeIncrementSelector({ onChange }: TimeIncrementSelectorProps) {
    return (
        <Select onValueChange={(value) => onChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time Increment" />
            </SelectTrigger>
            <SelectContent>
                {TIME_INCREMENTS.map((increment) => (
                    <SelectItem key={increment} value={increment}>{increment}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
