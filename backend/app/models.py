from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ── Profile models ─────────────────────────────────────────────────────────────

class ProfileCreate(BaseModel):
    username: str
    bio: Optional[str] = None
    class_year: Optional[str] = None   # "class" is a reserved word in Python
    targetCollege: Optional[str] = None
    homeCountry: Optional[str] = None
    targetCountry: Optional[str] = None
    prefCurrency: Optional[str] = None


class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    class_year: Optional[str] = None
    targetCollege: Optional[str] = None
    homeCountry: Optional[str] = None
    targetCountry: Optional[str] = None
    prefCurrency: Optional[str] = None


class ProfileResponse(ProfileCreate):
    createdAt: datetime


# ── Project models ──────────────────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    projectName: str
    aboutPitch: Optional[str] = None
    description: Optional[str] = None
    budgetValue: Optional[float] = None
    budgetCurrency: Optional[str] = None
    ownerUsername: str


class ProjectUpdate(BaseModel):
    projectName: Optional[str] = None
    aboutPitch: Optional[str] = None
    description: Optional[str] = None
    budgetValue: Optional[float] = None
    budgetCurrency: Optional[str] = None


class ProjectResponse(ProjectCreate):
    projectId: str
    createdAt: datetime
