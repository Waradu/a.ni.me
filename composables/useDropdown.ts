export function useDropdown<T extends string | number>(options: { name: string; value: T }[], storeValue: T) {
  const selected = ref(
    options.find((option) => option.value === storeValue) || options[0]
  );

  watch(selected, (newSelected) => {
    storeValue = newSelected.value as typeof storeValue;
  });

  watch(
    () => storeValue,
    (newSortBy) => {
      const matchingOption = options.find((option) => option.value === newSortBy);
      if (matchingOption) {
        selected.value = matchingOption;
      }
    }
  );

  return { selected };
}
