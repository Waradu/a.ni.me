export const pageScopedDefaults = {
  title: () => "A • NI • ME",
  bgImage: () => "",
};

export const usePageScopedState = <T>(key: string) => {
  const route = useRoute();
  const internalKey = ref(`${key}-${route.fullPath}`);

  watch(
    () => route.fullPath,
    () => {
      internalKey.value = `${key}-${route.fullPath}`;
    }
  );

  const defaultValue =
    (pageScopedDefaults[key as keyof typeof pageScopedDefaults] as
      | (() => T)
      | undefined) || (() => null);

  return computed({
    get: () => useState<T | null>(internalKey.value, defaultValue).value,
    set: (val) => {
      useState<T | null>(internalKey.value, defaultValue).value = val;
    },
  });
};
