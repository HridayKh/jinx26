import { apiRequest } from './client';

export const DUMMY_PROJECT_IDS = ['proj_tokyo01', 'proj_verify02', 'proj_quantum03'];

export const createProject = (projectData) => apiRequest('/projects', {
    method: 'POST',
    body: projectData,
});

export const getProject = (projectId) => apiRequest(`/projects/${encodeURIComponent(projectId)}`);

export const getProjectsByIds = (projectIds = DUMMY_PROJECT_IDS) =>
    Promise.all(projectIds.map((projectId) => getProject(projectId)));

export const updateProject = (projectId, updates) => apiRequest(`/projects/${encodeURIComponent(projectId)}`, {
    method: 'PUT',
    body: updates,
});

export const deleteProject = (projectId) => apiRequest(`/projects/${encodeURIComponent(projectId)}`, {
    method: 'DELETE',
});
