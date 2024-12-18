import { useState, useEffect } from 'react';
import { DatePicker } from '~/components/ui/datepicker'; // Your custom DatePicker component

interface CustomDateRangeSelectorProps {
    onChange: (dateRange: { from: Date, to: Date }) => void;
}

export function CustomDateRangeSelector({ onChange }: CustomDateRangeSelectorProps) {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    // Trigger the onChange callback when both fromDate and toDate are set
    useEffect(() => {
        if (fromDate && toDate) {
            onChange({ from: fromDate, to: toDate });
        }
    }, [fromDate, toDate, onChange]); // Only run when both dates change

    const handleDateChange = (type: 'from' | 'to') => (date: Date | null) => {
        if (type === 'from') {
            setFromDate(date);
        } else {
            setToDate(date);
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

