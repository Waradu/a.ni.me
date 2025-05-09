import { error } from "@tauri-apps/plugin-log";
import { openUrl } from "@tauri-apps/plugin-opener";
import useShared, { LocalStorage } from "@waradu/useshared";
import { gql } from "graphql-tag";
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
    key: "auth",
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

    const { $apollo, $api } = useNuxtApp();
    await $apollo.client.clearStore();

    try {
      auth.value.user = await $api.user.profile();
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
