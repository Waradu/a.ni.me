<template>
  <div class="export rows">
    <h3 class="sectionTitle">Export</h3>
    <div class="item">
      <label for="exportData" class="text">Export all data
        <Info text="Like stars, watched, date added etc..." />
      </label>
      <label for="exportData" class="container">
        <input type="checkbox" name="exportData" id="exportData" v-model="exportImportSettings.exportData">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="item">
      <label for="exportHidden" class="text">Export hidden</label>
      <label for="exportHidden" class="container">
        <input type="checkbox" name="exportHidden" id="exportHidden" v-model="exportImportSettings.exportHidden">
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
  <hr>
  <div class="import rows">
    <h3 class="sectionTitle">Import</h3>
    <div class="item">
      <label for="overrideData" class="text">Override on import
        <Info text="Replaces your current anime list. NO GOING BACK." />
      </label>
      <label for="overrideData" class="container">
        <input type="checkbox" name="overrideData" id="overrideData" v-model="exportImportSettings.overrideData">
        <span class="checkmark red"></span>
      </label>
    </div>
  </div>
  <hr>
  <div class="buttons">
    <button @click="importFile">Import</button>
    <button @click="exportFile">Export</button>
  </div>
</template>

<script lang="ts" setup>
import { save, open } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { Modal } from "#build/components";

const props = defineProps<{
  exportImportModal: InstanceType<typeof Modal> | null;
}>();

const { $database } = useNuxtApp();
const router = useRouter();

const exportImportSettings = ref({
  exportData: false,
  exportHidden: false,
  overrideData: false
});

async function importFile() {
  const selectedPath = await open({
    title: "Import Anime List",
    filters: [
      { name: "CSV File", extensions: ["csv"] }
    ],
  });

  if (!selectedPath) return;

  if (exportImportSettings.value.overrideData) {
    await $database.deleteAll();
  }

  if (selectedPath) {
    const csvContent = await readTextFile(selectedPath);
    const lines = csvContent.split("\n");

    const headers = lines[0].split(",");
    const dataLines = lines.slice(1);

    if (headers.length === 1 && headers[0] === 'id') {
      for (const line of dataLines) {
        const id = line.trim();
        if (id) {
          await $database.add(id.trim());
        }
      }
    } else if (headers.length === 6 && headers[0] === 'id') {
      for (const line of dataLines) {
        const [id, created_at, stars, rewatch_count, recommended_by, watched, is_hidden, tags] = line.split(",");
        if (id) {
          await $database.addWithData({
            id: id.trim(),
            created_at: new Date(created_at).toISOString(),
            stars: parseFloat(stars),
            rewatch_count: parseInt(rewatch_count),
            recommended_by: recommended_by.trim(),
            watched: watched.trim() === 'true',
            is_hidden: is_hidden.trim() === "true",
            tags: tags.trim()
          });
        }
      }
    }

    await router.replace({ path: '/redirect' });
    await router.replace({ path: '/' });
  }

  if (!props.exportImportModal) return;
  props.exportImportModal.hide();
}

async function exportFile() {
  const selectedPath = await save({
    title: "Export Anime List",
    defaultPath: `a.ni.me_export_${Date.now().toString()}.csv`,
    filters: [
      { name: "CSV File", extensions: ["csv"] }
    ],
  });

  if (!selectedPath) return;

  const animes = await $database.animes();

  if (!exportImportSettings.value.exportData) {
    const animesId = animes.map(a => a.id);
    const headers = ['id'];
    const csvContent = [
      headers.join(","),
      ...animesId.map(id => id)
    ].join("\n");

    if (selectedPath) {
      await writeTextFile(selectedPath, csvContent);
    }
  } else {
    const headers = ['id', 'created_at', 'stars', 'rewatch_count', 'recommended_by', 'watched', 'is_hidden', 'tags'];
    const csvContent = [
      headers.join(","),
      ...animes.map(anime => Object.values(anime).join(","))
    ].join("\n");

    if (selectedPath) {
      await writeTextFile(selectedPath, csvContent);
    }
  }

  if (!props.exportImportModal) return;
  props.exportImportModal.hide();
}
</script>

<style lang="scss">
.exportImportModal {
  h3.sectionTitle {
    color: #ffffffcc;
  }

  .rows {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    min-width: 400px;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;

      .dropdowns {
        display: flex;
        gap: 10px;
      }

      .text {
        width: 100%;
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .container {
        display: block;
        position: relative;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 25px;
        width: 25px;
        min-height: 25px;
        min-width: 25px;
        margin-top: 1px;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: #ffffff20;
          border-radius: 4px;
          transition: .2s ease-in-out;

          &:after {
            content: "";
            position: absolute;
            opacity: 0;
            transition: .2s ease-in-out;
            left: 9px;
            top: 5px;
            width: 4px;
            height: 9px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }

        &:has(:checked) {
          .checkmark {
            background-color: #4a794a80;

            &.red {
              background-color: #a0484880;
            }

            &:after {
              opacity: 1;
            }
          }
        }
      }

      &:hover {
        .checkmark {
          background-color: #ffffff40;
        }

        &:has(:checked) {
          .checkmark {
            background-color: #4a794add;

            &.red {
              background-color: #a04848dd;
            }
          }

        }
      }
    }
  }

  .buttons {
    display: flex;
    gap: 20px;

    button {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: none;
      background-color: #ffffff40;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: .2s ease-in-out;
      outline: none;

      &:hover {
        background-color: #ffffff30;
      }
    }
  }
}
</style>