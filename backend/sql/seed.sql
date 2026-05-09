INSERT OR IGNORE INTO profiles (
    username, bio, class_year, target_college, home_country, target_country, pref_currency, created_at
) VALUES (
    'demo_user',
    'First seeded user profile.',
    '2027',
    'Demo University',
    'India',
    'Germany',
    'EUR',
    '2026-01-01T00:00:00+00:00'
);

INSERT OR IGNORE INTO projects (
    project_id, project_name, about_pitch, description, budget_value, budget_currency, owner_username, created_at
) VALUES (
    'proj_seed01',
    'Seed Project',
    'Starter seeded project',
    'This project exists as initial SQLite seed data.',
    1000.0,
    'EUR',
    'demo_user',
    '2026-01-01T00:00:00+00:00'
);
