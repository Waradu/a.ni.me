use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_animes_table",
            sql: "
        CREATE TABLE animes (
            id INT PRIMARY KEY,
            created_at TIMESTAMPTZ,
            name TEXT,
            url TEXT,
            image TEXT,
            trailer TEXT,
            approved BOOL,
            episodes INT,
            airing BOOL,
            status TEXT,
            rating TEXT,
            popularity INT,
            score FLOAT8,
            scored_by INT,
            favorites INT,
            synopsis TEXT,
            year INT,
            stars INT,
            watched BOOL
        );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_genres_table",
            sql: "
        CREATE TABLE genres (
            id INT PRIMARY KEY,
            created_at TIMESTAMPTZ,
            name TEXT
        );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_characters_table",
            sql: "
        CREATE TABLE characters (
            id INT PRIMARY KEY,
            created_at TIMESTAMPTZ,
            name TEXT,
            image TEXT,
            anime_id INT,
            CONSTRAINT fk_anime
                FOREIGN KEY (anime_id) REFERENCES animes(id)
                ON DELETE CASCADE
        );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_anime_genre_table",
            sql: "
        CREATE TABLE anime_genre (
            id INT PRIMARY KEY,
            created_at TIMESTAMPTZ,
            anime_id INT,
            genre_id INT,
            CONSTRAINT fk_anime
                FOREIGN KEY (anime_id) REFERENCES animes(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_genre
                FOREIGN KEY (genre_id) REFERENCES genres(id)
                ON DELETE CASCADE
        );",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:anilist.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
