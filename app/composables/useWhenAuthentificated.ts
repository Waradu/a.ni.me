import { error } from "@tauri-apps/plugin-log";
import type { GetViewerDocument } from "~/gql/gen/types.generated";
import type { ResultOf } from "@graphql-typed-document-node/core";

type Viewer = ResultOf<typeof GetViewerDocument>["Viewer"];

export const useWhenAuthentificated = <T>(
  get: (user: NonNullable<Viewer>) => Promise<T>,
) => {
  const authStore = useAuthStore();

  const data = ref<T>();
  const fetching = ref(false);
  const fetched = ref(false);
  const errorMessage = ref("");

  watch(
    () => authStore.user,
    async () => {
      if (!authStore.user) return;
      if (fetched.value || fetching.value) return;

      fetching.value = true;

      try {
        data.value = await get(authStore.user);
      } catch (e) {
        errorMessage.value = getErrorMessage(e);
        error(errorMessage.value);
      }

      fetched.value = true;
    },
    { immediate: true },
  );

  return {
    data,
    fetched,
    errorMessage,
  };
};
