import {
  BaseDirectory,
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import type { SettingsStore } from "~/types/settings";

export default defineNuxtPlugin(async (nuxtApp) => {
  const settingsStore = useSettingsStore();
  await base();
  await load();

  settingsStore.$subscribe(async () => await settings.save());

  nuxtApp.hook("app:mounted", () => {
    if (import.meta.client && !settingsStore.finishedIntroduction) {
      const route = useRoute();
      if (!route.fullPath.startsWith("/setup/")) {
        navigateTo("/setup/start");
      }
    }
  });

  const settings = {
    async save() {
      const settingsFile = await exists("settings.json", {
        baseDir: BaseDirectory.AppData,
      });

      if (settingsFile) {
        await writeTextFile(
          `settings.json`,
          JSON.stringify(settingsStore.$state, null, 2),
          {
            baseDir: BaseDirectory.AppData,
          }
        );
      }
    },
  };

  async function load() {
    try {
      const settingsFile = await exists("settings.json", {
        baseDir: BaseDirectory.AppData,
      });

      if (!settingsFile) return;

      const content = await readTextFile(`settings.json`, {
        baseDir: BaseDirectory.AppData,
      });

      const parsedContent = JSON.parse(content) as SettingsStore;

      settingsStore.$patch(parsedContent);

      await writeTextFile(
        `settings.json`,
        JSON.stringify(settingsStore.$state, null, 2),
        {
          baseDir: BaseDirectory.AppData,
        }
      );
    } catch (e) {
      console.error(`Error while loading settings: ${e}`);
    }
  }

  async function base() {
    const appdataDir = await exists("", { baseDir: BaseDirectory.AppData });

    if (!appdataDir) {
      await mkdir("", {
        baseDir: BaseDirectory.AppData,
      });
    }

    const settingsFile = await exists("settings.json", {
      baseDir: BaseDirectory.AppData,
    });

    if (!settingsFile) {
      await writeTextFile(
        `settings.json`,
        JSON.stringify(settingsStore.$state, null, 2),
        {
          baseDir: BaseDirectory.AppData,
        }
      );
    }
  }

  return {
    provide: {
      settings,
    },
  };
});
