export const fetchData = async (platform: 'meta' | 'tiktok', params: any) => {
    try {
        const response = await fetch(`https://bizdev.newform.ai/sample-data/${platform}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication header if needed
                // 'Authorization': 'Bearer YOUR_API_KEY',
            },
            body: JSON.stringify(params),
        });

        // Check if response status is successful (2xx)
        if (!response.ok) {
            // If not, return error details from the response
            const errorDetails = await response.text();  // Get response text for details (e.g., error message)
            return { error: `${errorDetails}` };
        }

        // If response is OK, return the JSON data
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);

        // If the error is a network error, return a generic message
        if (error instanceof Error) {
            return { error: error.message };
        }

        // In case of an unexpected error, return a fallback message
        return { error: 'An unexpected error occurred during the API request.' };
    }
};

