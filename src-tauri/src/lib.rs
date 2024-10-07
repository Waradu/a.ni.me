use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg(debug_assertions)]
fn prevent_default() -> tauri::plugin::TauriPlugin<tauri::Wry> {
    use tauri_plugin_prevent_default::Flags;

    tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::empty())
        .build()
}

#[cfg(not(debug_assertions))]
fn prevent_default() -> tauri::plugin::TauriPlugin<tauri::Wry> {
    tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all().difference(Flags::FIND | Flags::RELOAD))
        .build()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let anime_table = include_str!("migrations/animes.sql");

    let migrations = vec![Migration {
        version: 1,
        description: "create_animes_table",
        sql: anime_table,
        kind: MigrationKind::Up,
    }];

    let mut builder = tauri::Builder::default();

    builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
        let _ = app
            .get_webview_window("main")
            .expect("no main window")
            .set_focus();
    }));

    builder = builder.plugin(tauri_plugin_window_state::Builder::default().build());

    builder = builder.plugin(
        tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:a.ni.me.db", migrations)
            .build(),
    );

    builder = builder.plugin(prevent_default());

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
