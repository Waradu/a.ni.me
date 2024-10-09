export function useDropdown<T extends string | number>(
  options: { name: string; value: T }[],
  storeValue: T,
  setStoreValue: (value: T) => void
) {
  const selected = ref(
    options.find((option) => option.value === storeValue) || options[0]
  );

  watch(selected, (newSelected) => {
    setStoreValue(newSelected.value as T);
  });

  watch(
    () => storeValue,
    (newSortBy) => {
      const matchingOption = options.find(
        (option) => option.value === newSortBy
      );
      if (matchingOption) {
        selected.value = matchingOption;
      }
    }
  );

  return { selected };
}
