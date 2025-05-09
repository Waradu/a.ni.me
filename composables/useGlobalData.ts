import useShared from "@waradu/useshared";

interface GlobalData {
  bgImage?: string;
  title: string;
}

const defaultData: GlobalData = {
  title: "A • NI • ME",
};

export const useGlobalData = () => {
  const { data: globalData, reset } = useShared<GlobalData>({
    key: "globalData",
    data: defaultData,
  });

  const route = useRoute();

  watch(() => route.fullPath, reset);

  return {
    globalData,
    reset,
  };
};
