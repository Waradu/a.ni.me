import { check } from "@tauri-apps/plugin-updater";
import type { Update, DownloadEvent } from "@tauri-apps/plugin-updater";
import { error } from "@tauri-apps/plugin-log";
import { errorMsg } from "~/utils/error";

export function useUpdater() {
  const updateInfo = ref<Update | null>(null);
  const updateAvailable = ref(false);
  const latestVersion = ref("");
  const progress = ref(0);
  const updateError = ref<unknown>(null);
  const pending = ref(false);
  const downloading = ref(false);
  const { settings } = useSettings();

  let _contentLength = 0;
  let _downloaded = 0;

  async function checkAndDownload() {
    updateError.value = null;
    try {
      pending.value = true;
      const upd = await check();
      pending.value = false;

      if (upd) {
        updateInfo.value = upd;
        updateAvailable.value = true;
        latestVersion.value = upd.version;

        progress.value = 0;
        _contentLength = 0;
        _downloaded = 0;
        pending.value = false;
        downloading.value = true;

        try {
          await upd.download((event: DownloadEvent) => {
            if (event.event === "Started") {
              _contentLength = event.data.contentLength ?? 0;
            } else if (event.event === "Progress") {
              _downloaded += event.data.chunkLength;
              let _progress =
                _contentLength > 0 ? _downloaded / _contentLength : 0;
              progress.value = _progress;
            }
          });
        } catch (err) {
          updateError.value = err;
        } finally {
          downloading.value = false;
        }
      } else {
        updateInfo.value = null;
        updateAvailable.value = false;
        latestVersion.value = "";
      }
    } catch (err) {
      updateError.value = err;
      updateAvailable.value = false;
    }
  }

  async function installUpdate() {
    if (!updateInfo.value) return;
    try {
      await updateInfo.value.install();
    } catch (err) {
      updateError.value = err;
    }
  }

  if (!import.meta.dev) {
    until(settings)
      .toBeTruthy()
      .then(() => checkAndDownload());
  }

  watch(updateError, () => {
    if (!updateError?.value) return;

    error(errorMsg(updateError.value));
  });

  return {
    updateAvailable,
    latestVersion,
    progress,
    pending,
    downloading,
    error: updateError,
    check: checkAndDownload,
    install: installUpdate,
  };
}
