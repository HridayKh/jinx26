import sqlite3
from functools import lru_cache
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE_PATH = BASE_DIR / "local.sqlite3"
SCHEMA_PATH = BASE_DIR / "sql" / "schema.sql"
SEED_PATH = BASE_DIR / "sql" / "seed.sql"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


@lru_cache(maxsize=1)
def _load_sql_scripts() -> tuple[str, str]:
    try:
        return SCHEMA_PATH.read_text(), SEED_PATH.read_text()
    except FileNotFoundError as exc:
        raise RuntimeError(f"Required SQL initialization file is missing: {exc.filename}") from exc


def initialize_database() -> None:
    schema_sql, seed_sql = _load_sql_scripts()
    with get_connection() as connection:
        connection.execute("PRAGMA foreign_keys = ON;")
        connection.executescript(schema_sql)
        connection.executescript(seed_sql)
