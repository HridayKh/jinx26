import { apiRequest } from './client';

const normalizeProfilePayload = (payload = {}) => {
    const normalized = { ...payload };

    // API design uses `class`, while backend model expects `class_year`.
    if (normalized.class && !normalized.class_year) {
        normalized.class_year = normalized.class;
        delete normalized.class;
    }

    return normalized;
};

export const createProfile = (profileData) => apiRequest('/profiles', {
    method: 'POST',
    body: normalizeProfilePayload(profileData),
});

export const getProfile = (username) => apiRequest(`/profiles/${encodeURIComponent(username)}`);

export const updateProfile = (username, updates) => apiRequest(`/profiles/${encodeURIComponent(username)}`, {
    method: 'PUT',
    body: normalizeProfilePayload(updates),
});

export const deleteProfile = (username) => apiRequest(`/profiles/${encodeURIComponent(username)}`, {
    method: 'DELETE',
});
