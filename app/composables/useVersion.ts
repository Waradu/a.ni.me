import {
  getVersion,
  getName,
  getTauriVersion,
  getIdentifier,
} from "@tauri-apps/api/app";

export const useVersion = () => {
  const { data: version } = useAsyncData("a.ni.me-version", () => getVersion());
  const { data: name } = useAsyncData("a.ni.me-name", () => getName());
  const { data: tauriVersion } = useAsyncData("a.ni.me-tauriVersion", () =>
    getTauriVersion(),
  );
  const { data: identifier } = useAsyncData("a.ni.me-identifier", () =>
    getIdentifier(),
  );

  return {
    version,
    name,
    tauriVersion,
    identifier,
  };
};
