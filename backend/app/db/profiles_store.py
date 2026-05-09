"""
In-memory store (replace with a real database later).
"""
from datetime import datetime, timezone
from app.models import ProfileCreate, ProfileUpdate, ProfileResponse

# { username -> ProfileResponse }
_profiles: dict[str, ProfileResponse] = {
    "alexrivers": ProfileResponse(
        username="alexrivers",
        bio="Senior researcher building modular academic exchange programs.",
        class_year="Senior Researcher",
        targetCollege="ETH Zurich",
        homeCountry="India",
        targetCountry="Switzerland",
        prefCurrency="CHF",
        createdAt=datetime(2024, 9, 12, 8, 30, tzinfo=timezone.utc),
    )
}


def create_profile(data: ProfileCreate) -> ProfileResponse:
    profile = ProfileResponse(**data.model_dump(), createdAt=datetime.now(timezone.utc))
    _profiles[profile.username] = profile
    return profile


def get_profile(username: str) -> ProfileResponse | None:
    return _profiles.get(username)


def update_profile(username: str, data: ProfileUpdate) -> ProfileResponse | None:
    profile = _profiles.get(username)
    if profile is None:
        return None
    updated = profile.model_copy(update=data.model_dump(exclude_unset=True))
    _profiles[username] = updated
    return updated


def delete_profile(username: str) -> bool:
    if username not in _profiles:
        return False
    del _profiles[username]
    return True
