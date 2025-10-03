import useShared, { LocalStorage } from "@waradu/useshared";

interface Settings {
  checkForUpdatesAutomatically: boolean;
  reducedAnimations: boolean;
  betaChannel: boolean;
}

const defaultData: Settings = {
  checkForUpdatesAutomatically: true,
  reducedAnimations: false,
  betaChannel: false,
};

export const useSettings = () => {
  const { data: settings, reset } = useShared<Settings>({
    key: "settings",
    data: defaultData,
    store: new LocalStorage(),
  });

  const reduceAnimations = () => {
    if (!settings.value || !window) return;

    if (settings.value.reducedAnimations) {
      window.document.body.classList.add("reduced");
    } else {
      window.document.body.classList.remove("reduced");
    }
  };

  watch(() => settings.value?.reducedAnimations, reduceAnimations);
  reduceAnimations();

  return {
    settings,
    reset,
  };
};
