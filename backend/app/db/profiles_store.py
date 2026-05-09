from datetime import datetime, timezone
from app.models import ProfileCreate, ProfileUpdate, ProfileResponse
from app.db.sqlite import get_connection


def _row_to_profile(row) -> ProfileResponse:
    return ProfileResponse(
        username=row["username"],
        bio=row["bio"],
        class_year=row["class_year"],
        targetCollege=row["target_college"],
        homeCountry=row["home_country"],
        targetCountry=row["target_country"],
        prefCurrency=row["pref_currency"],
        createdAt=datetime.fromisoformat(row["created_at"]),
    )


def create_profile(data: ProfileCreate) -> ProfileResponse:
    profile = ProfileResponse(**data.model_dump(), createdAt=datetime.now(timezone.utc))
    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO profiles (
                username, bio, class_year, target_college, home_country, target_country, pref_currency, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                profile.username,
                profile.bio,
                profile.class_year,
                profile.targetCollege,
                profile.homeCountry,
                profile.targetCountry,
                profile.prefCurrency,
                profile.createdAt.isoformat(),
            ),
        )
    return profile


def get_profile(username: str) -> ProfileResponse | None:
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT username, bio, class_year, target_college, home_country, target_country, pref_currency, created_at
            FROM profiles
            WHERE username = ?
            """,
            (username,),
        ).fetchone()
    if row is None:
        return None
    return _row_to_profile(row)


def update_profile(username: str, data: ProfileUpdate) -> ProfileResponse | None:
    profile = get_profile(username)
    if profile is None:
        return None

    updated = profile.model_copy(update=data.model_dump(exclude_unset=True))
    with get_connection() as connection:
        connection.execute(
            """
            UPDATE profiles
            SET bio = ?, class_year = ?, target_college = ?, home_country = ?, target_country = ?, pref_currency = ?
            WHERE username = ?
            """,
            (
                updated.bio,
                updated.class_year,
                updated.targetCollege,
                updated.homeCountry,
                updated.targetCountry,
                updated.prefCurrency,
                username,
            ),
        )
    return updated


def delete_profile(username: str) -> bool:
    with get_connection() as connection:
        result = connection.execute("DELETE FROM profiles WHERE username = ?", (username,))
        return result.rowcount > 0
