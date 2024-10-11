CREATE TABLE animes (
    id INT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    stars INT DEFAULT 0,
    rewatch_count INT DEFAULT 0,
    recommended_by TEXT DEFAULT "",
    watched BOOL DEFAULT false,
    is_hidden BOOL DEFAULT false,
    tags TEXT DEFAULT ""
);