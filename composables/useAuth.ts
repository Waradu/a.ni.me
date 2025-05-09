import { error } from "@tauri-apps/plugin-log";
import { openUrl } from "@tauri-apps/plugin-opener";
import useShared, { LocalStorage } from "@waradu/useshared";
import { gql } from "graphql-request";
import type { Viewer } from "~/types/viewer";

export interface UserDataResponse {
  Viewer: Viewer;
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

  const isLoggedIn = ref(false);

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
    isLoggedIn.value = true;
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
      const response = await anilistFetch<UserDataResponse>(
        {
          query: userDetailsGql,
        },
        auth.value.token
      );

      auth.value.user = response.data.Viewer;
    } catch (e) {
      error(errorMsg(e));
    }
  };

  watch(() => auth.value?.token, refreshUser);
  refreshUser();

  const logout = () => {
    isLoggedIn.value = false;
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
