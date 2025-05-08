import { openUrl } from "@tauri-apps/plugin-opener";
import useShared, { LocalStorage } from "@waradu/useshared";

interface Auth {
  token: string;
}

const defaultData: Auth = {
  token: "",
};

export const useAuth = () => {
  const { redirectUri } = useRuntimeConfig().public;

  const { data: auth, reset } = useShared<Auth>({
    key: "user",
    data: defaultData,
    store: new LocalStorage(),
  });

  const browser = () => {
    openUrl(redirectUri);
  };

  watch(
    () => auth.value?.token,
    (token) => {
      if (!token) return;
    }
  );

  return {
    auth,
    reset,
    browser,
  };
};
