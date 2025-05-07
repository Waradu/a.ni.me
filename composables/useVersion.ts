import {
  getVersion,
  getName,
  getTauriVersion,
  getIdentifier,
} from "@tauri-apps/api/app";

export const useVersion = () => {
  const { data: version } = useAsyncData(() => getVersion());
  const { data: name } = useAsyncData(() => getName());
  const { data: tauriVersion } = useAsyncData(() => getTauriVersion());
  const { data: identifier } = useAsyncData(() => getIdentifier());

  return {
    version,
    name,
    tauriVersion,
    identifier,
  };
};
