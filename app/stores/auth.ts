import type { Viewer } from "~/types/viewer";
import { openUrl } from "@tauri-apps/plugin-opener";
import { error } from "@tauri-apps/plugin-log";

export const useAuthStore = defineStore("authStore", () => {
  const { redirectUri } = useRuntimeConfig().public;

  const token = ref<string>();
  const user = ref<Viewer>();
  const errorMessage = ref("");

  const openInBrowser = () => {
    errorMessage.value = "";
    openUrl(redirectUri);
  };

  const refreshUser = async () => {
    if (!token.value) return;

    const { $apollo, $api } = useNuxtApp();
    await $apollo.client.clearStore();

    try {
      errorMessage.value = "";
      const anilistUser = await $api.user.profile();
      user.value = anilistUser;
    } catch (e) {
      errorMessage.value = getErrorMessage(e);
      error(errorMessage.value);
    }
  };

  const reset = () => {
    errorMessage.value = "";
    token.value = "";
    user.value = undefined;
  };

  const logout = () => {
    reset();
    navigateTo("/welcome");
  };

  return { token, user, openInBrowser, refreshUser, reset, logout, redirectUri, errorMessage };
}, {
  persist: {
    storage: localStorage,
    pick: ["token", "user"]
  }
});
