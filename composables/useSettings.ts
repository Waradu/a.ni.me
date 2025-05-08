import useShared, { LocalStorage } from "@waradu/useshared";

interface Settings {
  finishedIntroduction: boolean;
  showNSFW: boolean;
  reducedAnimations: boolean;
}

const defaultData: Settings = {
  finishedIntroduction: false,
  showNSFW: false,
  reducedAnimations: false,
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
