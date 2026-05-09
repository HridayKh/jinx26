from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import profiles, projects
from app.db.sqlite import initialize_database


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


app = FastAPI(
    title="Student Exchange Hub API",
    description="CRUD API for Profiles (The Passport) and Projects (The Initiative)",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow the Vite dev server (and any localhost origin) to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profiles.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Student Exchange Hub API is running. Visit /docs for the API explorer."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
