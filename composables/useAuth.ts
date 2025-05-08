import { error } from "@tauri-apps/plugin-log";
import { openUrl } from "@tauri-apps/plugin-opener";
import useShared, { LocalStorage } from "@waradu/useshared";
import axios from "axios";
import { gql } from "graphql-request";
import { errorMsg } from "~/utils/error";

export interface UserDataResponse {
  Viewer: Viewer;
}

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

interface Auth {
  token: string;
  user?: Viewer;
}

const defaultData: Auth = {
  token: "",
};

export const useAuth = () => {
  const { redirectUri } = useRuntimeConfig().public;

  const { data: auth, reset } = useShared<Auth>({
    key: "user",
    data: defaultData,
    store: new LocalStorage(),
  });

  const browser = () => {
    openUrl(redirectUri);
  };

  const refreshUser = async () => {
    if (!auth.value?.token) return;
    if (auth.value.user) return;

    const userDetailsGql = gql`
      query Viewer {
        Viewer {
          id
          name
          avatar {
            large
          }
          bannerImage
          options {
            displayAdultContent
            titleLanguage
          }
          siteUrl
        }
      }
    `;

    try {
      const response = await axios.post<{ data: UserDataResponse }>(
        "https://graphql.anilist.co",
        {
          query: userDetailsGql,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.value.token}`,
          },
        }
      );

      auth.value.user = response.data.data.Viewer;
    } catch (e) {
      error(errorMsg(e));
    }
  };

  watch(() => auth.value?.token, refreshUser);
  refreshUser();

  const logout = () => {
    reset();
  };

  return {
    auth,
    reset,
    browser,
    logout,
    refreshUser,
  };
};
