import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface ReportTypeSelectorProps {
    onChange: (value: string) => void;
}

const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ onChange }) => {
    const handleChange = (value: string) => {
        onChange(value);
    };

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Report Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="BASIC">Basic</SelectItem>
                <SelectItem value="AUDIENCE">Audience</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default ReportTypeSelector;
