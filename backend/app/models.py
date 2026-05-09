from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


# ── Profile models ─────────────────────────────────────────────────────────────

class ProfileCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    username: str
    bio: Optional[str] = Field(default=None, max_length=150)
    class_year: Optional[str] = Field(default=None, alias="class")  # "class" is reserved in Python
    targetCollege: Optional[str] = None
    homeCountry: Optional[str] = None
    targetCountry: Optional[str] = None
    prefCurrency: Optional[str] = None


class ProfileUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    bio: Optional[str] = Field(default=None, max_length=150)
    class_year: Optional[str] = Field(default=None, alias="class")
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
