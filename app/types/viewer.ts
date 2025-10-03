export interface Viewer {
  id: number;
  name: string;
  avatar: Avatar;
  bannerImage: string;
  options: Options;
  siteUrl: string;
}

export interface Avatar {
  large: string;
}

export interface Options {
  displayAdultContent: boolean;
  titleLanguage: string;
}

export interface UserDataResponse {
  Viewer: Viewer;
}