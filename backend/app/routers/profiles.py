from fastapi import APIRouter, HTTPException, status
from app.models import ProfileCreate, ProfileUpdate, ProfileResponse
from app.db import profiles_store

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("", response_model=ProfileResponse, status_code=status.HTTP_201_CREATED)
def create_profile(data: ProfileCreate):
    """POST /api/v1/profiles — Create a new user profile."""
    if profiles_store.get_profile(data.username):
        raise HTTPException(status_code=409, detail="Username already exists.")
    return profiles_store.create_profile(data)


@router.get("/{username}", response_model=ProfileResponse)
def read_profile(username: str):
    """GET /api/v1/profiles/:username — Retrieve a profile."""
    profile = profiles_store.get_profile(username)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found.")
    return profile


@router.put("/{username}", response_model=ProfileResponse)
def update_profile(username: str, data: ProfileUpdate):
    """PUT /api/v1/profiles/:username — Update a profile."""
    profile = profiles_store.update_profile(username, data)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found.")
    return profile


@router.delete("/{username}", status_code=status.HTTP_204_NO_CONTENT)
def delete_profile(username: str):
    """DELETE /api/v1/profiles/:username — Delete a profile."""
    if not profiles_store.delete_profile(username):
        raise HTTPException(status_code=404, detail="Profile not found.")
