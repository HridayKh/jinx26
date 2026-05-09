from typing import Annotated
from fastapi import APIRouter, HTTPException, Path, status
from app.models import ProjectCreate, ProjectUpdate, ProjectResponse
from app.db import projects_store

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(data: ProjectCreate):
    """POST /api/v1/projects — Create a new project."""
    return projects_store.create_project(data)


@router.get("/{projectId}", response_model=ProjectResponse)
def read_project(project_id: Annotated[str, Path(alias="projectId")]):
    """GET /api/v1/projects/:projectId — Retrieve a project."""
    project = projects_store.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project


@router.put("/{projectId}", response_model=ProjectResponse)
def update_project(project_id: Annotated[str, Path(alias="projectId")], data: ProjectUpdate):
    """PUT /api/v1/projects/:projectId — Update a project."""
    project = projects_store.update_project(project_id, data)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project


@router.delete("/{projectId}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: Annotated[str, Path(alias="projectId")]):
    """DELETE /api/v1/projects/:projectId — Delete a project."""
    if not projects_store.delete_project(project_id):
        raise HTTPException(status_code=404, detail="Project not found.")
