const API_BASE_URL = 'http://localhost:8000/api/v1';

export const apiRequest = async (path, options = {}) => {
    const { method = 'GET', body, headers = {} } = options;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message = typeof data === 'object' && data?.detail
            ? data.detail
            : `API request failed with status ${response.status}`;

        throw new Error(message);
    }

    return data;
};
