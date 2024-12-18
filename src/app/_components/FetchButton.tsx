import { Button } from '~/components/ui/button';

interface FetchButtonProps {
    onClick: () => void;
}

export function FetchButton({ onClick }: FetchButtonProps) {
    return (
        <Button onClick={onClick}>Fetch Data</Button>
    );
}
