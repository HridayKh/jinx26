"""
In-memory store (replace with a real database later).
"""
import uuid
from datetime import datetime, timezone
from app.models import ProjectCreate, ProjectUpdate, ProjectResponse

# { projectId -> ProjectResponse }
_projects: dict[str, ProjectResponse] = {
    "proj_tokyo01": ProjectResponse(
        projectName="Hyper-Local Logistics in Tokyo Core",
        aboutPitch="Researching resilient city-scale exchange logistics.",
        description="Designing modular logistics pathways for exchange students in dense Tokyo wards.",
        budgetValue=12000,
        budgetCurrency="USD",
        ownerUsername="alexrivers",
        projectId="proj_tokyo01",
        createdAt=datetime(2024, 3, 12, 10, 0, tzinfo=timezone.utc),
    ),
    "proj_verify02": ProjectResponse(
        projectName="Cross-Border Academic Verification",
        aboutPitch="Portable trust layers for education credentials.",
        description="Building a verification approach for cross-country academic documents and exchange intake.",
        budgetValue=9000,
        budgetCurrency="USD",
        ownerUsername="alexrivers",
        projectId="proj_verify02",
        createdAt=datetime(2024, 2, 28, 14, 0, tzinfo=timezone.utc),
    ),
    "proj_quantum03": ProjectResponse(
        projectName="Quantum Mesh Networking",
        aboutPitch="Decentralized key distribution study with partner campuses.",
        description="Collaborative initiative focused on quantum-safe mesh architecture for academic environments.",
        budgetValue=15500,
        budgetCurrency="EUR",
        ownerUsername="alexrivers",
        projectId="proj_quantum03",
        createdAt=datetime(2024, 1, 18, 9, 0, tzinfo=timezone.utc),
    ),
}


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
