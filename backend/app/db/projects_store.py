"""
In-memory store (replace with a real database later).
"""
import uuid
from datetime import datetime, timezone
from app.models import ProjectCreate, ProjectUpdate, ProjectResponse

# { projectId -> ProjectResponse }
_projects: dict[str, ProjectResponse] = {}


def create_project(data: ProjectCreate) -> ProjectResponse:
    project_id = f"proj_{uuid.uuid4().hex[:6]}"
    project = ProjectResponse(
        **data.model_dump(),
        projectId=project_id,
        createdAt=datetime.now(timezone.utc),
    )
    _projects[project_id] = project
    return project


def get_project(project_id: str) -> ProjectResponse | None:
    return _projects.get(project_id)


def update_project(project_id: str, data: ProjectUpdate) -> ProjectResponse | None:
    project = _projects.get(project_id)
    if project is None:
        return None
    updated = project.model_copy(update=data.model_dump(exclude_unset=True))
    _projects[project_id] = updated
    return updated


def delete_project(project_id: str) -> bool:
    if project_id not in _projects:
        return False
    del _projects[project_id]
    return True
