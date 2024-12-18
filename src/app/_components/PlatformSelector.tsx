import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface PlatformSelectorProps {
    onChange: (platform: 'meta' | 'tiktok') => void;
}

export function PlatformSelector({ onChange }: PlatformSelectorProps) {
    return (
        <Select onValueChange={(value) => onChange(value as 'meta' | 'tiktok')}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="meta">Meta</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
        </Select>
    );
}
