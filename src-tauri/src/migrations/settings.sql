CREATE TABLE animes (
    id INT PRIMARY KEY,
    setup_completed BOOL DEFAULT false,
    show_nsfw BOOL DEFAULT false,
    tv_only BOOL DEFAULT true
);