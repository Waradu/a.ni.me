import { error } from "@tauri-apps/plugin-log";

export const useWhenAuthentificated = <T>(get: () => Promise<T>) => {
  const { auth } = useAuth();

  const data = ref<T>();
  const fetching = ref(false);
  const fetched = ref(false);
  const errorMessage = ref("");

  watch(
    () => auth.value?.user,
    async () => {
      if (!auth.value?.user) return;
      if (fetched.value || fetching.value) return;

      fetching.value = true;

      try {
        data.value = await get();
      } catch (e) {
        errorMessage.value = getErrorMessage(e);
        error(errorMessage.value);
      }

      fetched.value = true;
    },
    { immediate: true }
  );

  return {
    data,
    fetched,
    errorMessage,
  };
};
