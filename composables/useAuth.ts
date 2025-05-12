import { error } from "@tauri-apps/plugin-log";
import { openUrl } from "@tauri-apps/plugin-opener";
import useShared, { LocalStorage } from "@waradu/useshared";
import type { Viewer } from "~/types/viewer";

export interface UserDataResponse {
  Viewer: Viewer;
}

export interface Auth {
  token: string;
  user?: Viewer;
}

const defaultData: Auth = {
  token: "",
};

const { data: auth, reset } = useShared<Auth>({
  key: "auth",
  data: defaultData,
  store: new LocalStorage(),
});

export const useAuth = () => {
  const { redirectUri } = useRuntimeConfig().public;
  const errorMessage = ref("");

  const isLoggedIn = ref(false);

  const browser = () => {
    errorMessage.value = "";
    openUrl(redirectUri);
  };

  const refreshUser = async () => {
    if (!auth.value?.token) return;
    if (auth.value.user) return;

    const { $apollo, $api } = useNuxtApp();
    await $apollo.client.clearStore();

    try {
      errorMessage.value = "";
      const user = await $api.user.profile();
      auth.value.user = user;
      isLoggedIn.value = true;
    } catch (e) {
      errorMessage.value = getErrorMessage(e);
      error(errorMessage.value);
    }
  };

  const logout = () => {
    errorMessage.value = "";
    isLoggedIn.value = false;
    reset();
  };

  return {
    auth,
    reset,
    browser,
    logout,
    refreshUser,
    errorMessage,
    redirectUri
  };
};
