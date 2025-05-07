import { check } from "@tauri-apps/plugin-updater";
import type { Update, DownloadEvent } from "@tauri-apps/plugin-updater";

export function useUpdater(skipOn = false) {
  const updateInfo = ref<Update | null>(null);
  const updateAvailable = ref(false);
  const latestVersion = ref("");
  const progress = ref(0);
  const error = ref<unknown>(null);
  const pending = ref(false);
  const downloading = ref(false);

  let _contentLength = 0;
  let _downloaded = 0;

  async function checkAndDownload() {
    error.value = null;
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
              console.log(_contentLength);
            } else if (event.event === "Progress") {
              _downloaded += event.data.chunkLength;
              let _progress =
                _contentLength > 0 ? _downloaded / _contentLength : 0;
              progress.value = _progress;
            }
          });
        } catch (err) {
          error.value = err;
        } finally {
          downloading.value = false;
        }
      } else {
        updateInfo.value = null;
        updateAvailable.value = false;
        latestVersion.value = "";
      }
    } catch (err) {
      error.value = err;
      updateAvailable.value = false;
    }
  }

  async function installUpdate() {
    if (!updateInfo.value) return;
    try {
      await updateInfo.value.install();
    } catch (err) {
      error.value = err;
    }
  }

  if (!skipOn) {
    checkAndDownload();
  }

  watch(error, () => {
    console.error(error);
  });

  return {
    updateAvailable,
    latestVersion,
    progress,
    pending,
    downloading,
    error,
    check: checkAndDownload,
    install: installUpdate,
  };
}
