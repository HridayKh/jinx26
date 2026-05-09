import uuid
from datetime import datetime, timezone
from app.models import ProjectCreate, ProjectUpdate, ProjectResponse
from app.db.sqlite import get_connection


def _row_to_project(row) -> ProjectResponse:
    return ProjectResponse(
        projectName=row["project_name"],
        aboutPitch=row["about_pitch"],
        description=row["description"],
        budgetValue=row["budget_value"],
        budgetCurrency=row["budget_currency"],
        ownerUsername=row["owner_username"],
        projectId=row["project_id"],
        createdAt=datetime.fromisoformat(row["created_at"]),
    )


def create_project(data: ProjectCreate) -> ProjectResponse:
    project_id = f"proj_{uuid.uuid4().hex[:6]}"
    project = ProjectResponse(
        **data.model_dump(),
        projectId=project_id,
        createdAt=datetime.now(timezone.utc),
    )
    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO projects (
                project_id, project_name, about_pitch, description, budget_value, budget_currency, owner_username, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                project.projectId,
                project.projectName,
                project.aboutPitch,
                project.description,
                project.budgetValue,
                project.budgetCurrency,
                project.ownerUsername,
                project.createdAt.isoformat(),
            ),
        )
    return project


def get_project(project_id: str) -> ProjectResponse | None:
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT project_id, project_name, about_pitch, description, budget_value, budget_currency, owner_username, created_at
            FROM projects
            WHERE project_id = ?
            """,
            (project_id,),
        ).fetchone()
    if row is None:
        return None
    return _row_to_project(row)


def update_project(project_id: str, data: ProjectUpdate) -> ProjectResponse | None:
    project = get_project(project_id)
    if project is None:
        return None

    updated = project.model_copy(update=data.model_dump(exclude_unset=True))
    with get_connection() as connection:
        connection.execute(
            """
            UPDATE projects
            SET project_name = ?, about_pitch = ?, description = ?, budget_value = ?, budget_currency = ?
            WHERE project_id = ?
            """,
            (
                updated.projectName,
                updated.aboutPitch,
                updated.description,
                updated.budgetValue,
                updated.budgetCurrency,
                project_id,
            ),
        )
    return updated


def delete_project(project_id: str) -> bool:
    with get_connection() as connection:
        result = connection.execute("DELETE FROM projects WHERE project_id = ?", (project_id,))
        return result.rowcount > 0
