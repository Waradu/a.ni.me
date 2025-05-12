export const pageScopedDefaults = {
  title: () => "A • NI • ME",
  bgImage: () => false,
  statusbar: () => "",
  hideNavbar: () => false,
};

type PageScopedKeys = keyof typeof pageScopedDefaults;
type PageScopedType<K extends PageScopedKeys> = ReturnType<
  (typeof pageScopedDefaults)[K]
>;

export const usePageScopedState = <K extends PageScopedKeys>(key: K) => {
  const route = useRoute();
  const internalKey = ref(`${key}-${route.fullPath}`);

  watch(
    () => route.fullPath,
    () => {
      internalKey.value = `${key}-${route.fullPath}`;
    }
  );

  const defaultValue =
    (pageScopedDefaults[key] as () => PageScopedType<K>) || (() => null);

  return computed({
    get: () =>
      useState<PageScopedType<K> | null>(internalKey.value, defaultValue).value,
    set: (val) => {
      useState<PageScopedType<K> | null>(
        internalKey.value,
        defaultValue
      ).value = val;
    },
  });
};
