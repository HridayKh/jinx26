CREATE TABLE IF NOT EXISTS profiles (
    username TEXT PRIMARY KEY,
    bio TEXT,
    class_year TEXT,
    target_college TEXT,
    home_country TEXT,
    target_country TEXT,
    pref_currency TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    project_id TEXT PRIMARY KEY,
    project_name TEXT NOT NULL,
    about_pitch TEXT,
    description TEXT,
    budget_value REAL,
    budget_currency TEXT,
    owner_username TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (owner_username) REFERENCES profiles(username) ON DELETE CASCADE
);
