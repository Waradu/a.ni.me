export interface Response {
    pagination: Pagination;
    data:       Data[];
}

export interface Data {
    mal_id:          number;
    url:             string;
    images:          { [key: string]: Image };
    trailer:         Trailer;
    approved:        boolean;
    titles:          Title[];
    title:           string;
    title_english:   null | string;
    title_japanese:  string;
    title_synonyms:  string[];
    type:            string;
    source:          string;
    episodes:        number | null;
    status:          Status;
    airing:          boolean;
    aired:           Aired;
    duration:        string;
    rating:          Rating;
    score:           number | null;
    scored_by:       number | null;
    rank:            number | null;
    popularity:      number;
    members:         number;
    favorites:       number;
    synopsis:        null | string;
    background:      string;
    season:          null | string;
    year:            number | null;
    broadcast:       Broadcast;
    producers:       Genre[];
    licensors:       Genre[];
    studios:         Genre[];
    genres:          Genre[];
    explicit_genres: any[];
    themes:          Genre[];
    demographics:    any[];
}

export interface Aired {
    from:   Date;
    to:     Date | null;
    prop:   Prop;
    string: string;
}

export interface Prop {
    from: From;
    to:   From;
}

export interface From {
    day:   number | null;
    month: number | null;
    year:  number | null;
}

export interface Broadcast {
    day:      null | string;
    time:     null | string;
    timezone: null | string;
    string:   null | string;
}

export interface Genre {
    mal_id: number;
    type:   GenreType;
    name:   string;
    url:    string;
}

export enum GenreType {
    Anime = "anime",
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export enum Rating {
    GAllAges = "G - All Ages",
    PG13Teens13OrOlder = "PG-13 - Teens 13 or older",
    RxHentai = "Rx - Hentai",
}

export enum Status {
    CurrentlyAiring = "Currently Airing",
    FinishedAiring = "Finished Airing",
    NotYetAired = "Not yet aired",
}

export interface Title {
    type:  TitleType;
    title: string;
}

export enum TitleType {
    Default = "Default",
    English = "English",
    French = "French",
    German = "German",
    Japanese = "Japanese",
    Spanish = "Spanish",
    Synonym = "Synonym",
}

export interface Trailer {
    youtube_id: null | string;
    url:        null | string;
    embed_url:  null | string;
    images:     Images;
}

export interface Images {
    image_url:         null | string;
    small_image_url:   null | string;
    medium_image_url:  null | string;
    large_image_url:   null | string;
    maximum_image_url: null | string;
}

export interface Pagination {
    last_visible_page: number;
    has_next_page:     boolean;
    current_page:      number;
    items:             Items;
}

export interface Items {
    count:    number;
    total:    number;
    per_page: number;
}
