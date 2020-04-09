export type Collection = {
    limit: number,
    offset: number,
    total: number,
    items: string[] // array of poster ids
};

type Nullable<T> = T | null | undefined;
type StringOrNumber = string | number;
export type NumericalQueryParam = Nullable<StringOrNumber>;

export type MorressierPoster = {
    authors: string[], // array of MorressierUser ids
    author_names: string[],
    event: string, // MorressierEvent id
    id: string,
    keywords?: string[],
    paper_abstract?: string,
    public_access_enabled: boolean,
    submission_completed: boolean,
    title: string,
    uploaded_at: string,
    thumb_url: string,
    thumb_url_medium: string,
    thumb_url_large: string
};

export type MorressierUser = {
    id: string,
    title: string,
    full_name: string,
    picture_url: string,
    is_activated: boolean,
    organization: string,
    department: string,
    organization_location: string
};

export type MorressierEvent = {
    end_date: string,
    id: string,
    language: string,
    location: string,
    name: string,
    short_name: string,
    start_date: string,
    venue: string
};

export type SearchResultsResponseData = {
    collection: Collection,
    events: MorressierEvent[],
    posters: MorressierPoster[],
    users: MorressierUser[]
};

export type SinglePosterResponseData = {
    poster: MorressierPoster,
    event: MorressierEvent,
    users: MorressierUser[]
};