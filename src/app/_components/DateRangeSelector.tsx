import { useState } from 'react';
import { DatePicker } from '~/components/ui/datepicker'; // Assuming shadcn/ui has a DatePicker, otherwise use a different UI library or custom implementation

interface DateRangeSelectorProps {
    onDateRangeChange: (from: string, to: string) => void;
}

export function DateRangeSelector({ onDateRangeChange }: DateRangeSelectorProps) {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const handleDateChange = (type: 'from' | 'to') => (date: Date | null) => {
        if (type === 'from') {
            setFromDate(date);
        } else {
            setToDate(date);
        }
        if (fromDate && toDate) {
            onDateRangeChange(fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]);
        }
    };

    return (
        <div className="flex space-x-4">
            <DatePicker
                label="From"
                selected={fromDate}
                onChange={handleDateChange('from')}
                placeholderText="Select start date"
            />
            <DatePicker
                label="To"
                selected={toDate}
                onChange={handleDateChange('to')}
                placeholderText="Select end date"
            />
        </div>
    );
}
