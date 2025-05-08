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

  return {
    settings,
    reset,
  };
};
