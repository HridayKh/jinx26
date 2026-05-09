import { apiRequest } from './client';

export const createProject = (projectData) => apiRequest('/projects', {
    method: 'POST',
    body: projectData,
});

export const getProject = (projectId) => apiRequest(`/projects/${encodeURIComponent(projectId)}`);

export const updateProject = (projectId, updates) => apiRequest(`/projects/${encodeURIComponent(projectId)}`, {
    method: 'PUT',
    body: updates,
});

export const deleteProject = (projectId) => apiRequest(`/projects/${encodeURIComponent(projectId)}`, {
    method: 'DELETE',
});
