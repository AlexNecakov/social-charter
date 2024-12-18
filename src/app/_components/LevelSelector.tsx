import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface LevelSelectorProps {
    platform: 'meta' | 'tiktok';
    onChange: (level: string) => void;
}

const LEVELS = {
    meta: ['account', 'campaign', 'adset', 'ad'],
    tiktok: ['AUCTION_ADVERTISER', 'AUCTION_AD', 'AUCTION_CAMPAIGN']
};

export function LevelSelector({ platform, onChange }: LevelSelectorProps) {
    return (
        <Select onValueChange={(value) => onChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
                {LEVELS[platform].map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
