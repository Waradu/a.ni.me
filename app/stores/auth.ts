import { openUrl } from "@tauri-apps/plugin-opener";
import { error } from "@tauri-apps/plugin-log";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { GetViewerDocument } from "~/gql/gen/types.generated";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const { redirectUri } = useRuntimeConfig().public;

    type Viewer = ResultOf<typeof GetViewerDocument>["Viewer"];

    const token = ref<string>();
    const user = ref<Viewer>();
    const errorMessage = ref("");

    const openInBrowser = () => {
      errorMessage.value = "";
      openUrl(redirectUri);
    };

    const refreshUser = async () => {
      if (!token.value) return;

      const { $apollo } = useNuxtApp();
      await $apollo.client.clearStore();

      try {
        errorMessage.value = "";
        const viewer = await $apollo.query(GetViewerDocument);
        const anilistUser = viewer?.Viewer;
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

    return {
      token,
      user,
      openInBrowser,
      refreshUser,
      reset,
      logout,
      redirectUri,
      errorMessage,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["token"],
    },
  },
);
