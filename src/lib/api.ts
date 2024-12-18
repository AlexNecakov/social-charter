import { NextApiRequest, NextApiResponse } from 'next';

export const fetchData = async (platform: 'meta' | 'tiktok', params: any) => {
    try {
        const response = await fetch(`https://bizdev.newform.ai/sample-data/${platform}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        return null;
    }
};
