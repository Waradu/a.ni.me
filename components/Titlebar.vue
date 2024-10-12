<template>
  <header class="titlebar" :class="{ inSetup: setupStore.inSetup }" data-tauri-drag-region>
    <div class="data disableOnModal" data-tauri-drag-region>
      <div class="icons" data-tauri-drag-region>
        <NuxtLink class="wrapper" :to="titlebarStore.getBackLink()" v-if="mounted && titlebarStore.getBackLink() != ''">
          <ArrowBackIcon class="icon" />
        </NuxtLink>
        <NuxtLink :key="route.fullPath" class="wrapper" to="/" @click.prevent="navigateHome">
          <HomeIcon class="icon" />
        </NuxtLink>
      </div>
      <h3 :title="mounted ? titlebarStore.getTitle() : ''" data-tauri-drag-region v-if="mounted">
        {{ titlebarStore.getTitle() }}
      </h3>
    </div>
    <div class="input disableOnModal" data-tauri-drag-region>
      <input type="text" placeholder="Search" ref="input" :value="mounted ? titlebarStore.search : ''" @input="search"
        @keydown.enter="add" v-if="mounted">
    </div>
    <div class="controls" data-tauri-drag-region>
      <div class="icons" data-tauri-drag-region>
        <div class="wrapper disableOnModal" @click="openExportImportMenu">
          <ArrowSwapIcon class="icon" />
        </div>
        <div class="wrapper disableOnModal" @click="openSortingFilterMenu">
          <FilterIcon class="icon" />
        </div>
        <div class="wrapper disableOnModal" @click="openSettings">
          <SettingsIcon class="icon" />
        </div>
        <div class="space" data-tauri-drag-region></div>
        <div class="wrapper control" @click="async () => getCurrentWindow().minimize()">
          <MinimizeIcon class="icon" />
        </div>
        <div class="wrapper control" v-if="isMaximized" @click="async () => getCurrentWindow().toggleMaximize()">
          <RestoreIcon class="icon" />
        </div>
        <div class="wrapper control" v-else @click="async () => getCurrentWindow().toggleMaximize()">
          <MaximizeIcon class="icon" />
        </div>
        <div class="wrapper control red" @click="() => getCurrentWindow().close()">
          <CloseIcon class="icon" />
        </div>
      </div>
      <Modal header="Sort & Filter" ref="sortFilterModal" class="sortFilterModal">
        <div class="sorting rows">
          <div class="item">
            <span>Sort By</span>
            <Dropdown :items="sortByOptions" v-model="sortBySelected" />
          </div>
          <div class="item">
            <span>Order</span>
            <Dropdown :items="orderOptions" v-model="orderSelected" />
          </div>
        </div>
        <hr>
        <div class="filtering rows">
          <div class="item">
            <span>Stars</span>
            <div class="dropdowns">
              <Dropdown :items="filterOptions" v-model="filterStarsTypeSelected"
                v-if="filterStarsSelected.value != null" />
              <Dropdown :items="filterStarsOptions" v-model="filterStarsSelected" />
            </div>
          </div>
          <div class="item">
            <span>Watched</span>
            <div class="dropdowns">
              <Dropdown :items="filterWatchedOptions" v-model="filterWatchedSelected" />
            </div>
          </div>
          <div class="item">
            <label for="showHidden" class="text">Show hidden</label>
            <label for="showHidden" class="container">
              <input type="checkbox" name="showHidden" id="showHidden" v-model="settingsStore.filters.showHidden">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </Modal>
      <Modal header="Export & Import" ref="exportImportModal" class="exportImportModal">
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
      </Modal>
    </div>
  </header>
</template>

<script lang="ts" setup>
import ArrowBackIcon from "@fluentui/svg-icons/icons/arrow_left_32_regular.svg";
import HomeIcon from "@fluentui/svg-icons/icons/home_32_regular.svg";
import SettingsIcon from "@fluentui/svg-icons/icons/settings_32_regular.svg";
import FilterIcon from "@fluentui/svg-icons/icons/filter_32_regular.svg";
import ArrowSwapIcon from "@fluentui/svg-icons/icons/arrow_swap_28_regular.svg";
import MaximizeIcon from "~/assets/svg/maximize.svg";
import MinimizeIcon from "~/assets/svg/minimize.svg";
import RestoreIcon from "~/assets/svg/restore.svg";
import CloseIcon from "~/assets/svg/close.svg";
import { getCurrentWindow } from "@tauri-apps/api/window";
import type { Modal } from "#build/components";
import type { FilterType, FilterValue, Item, Order, SortBy } from "~/types/types";
import { save, open } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const settingsStore = useSettingsStore();

const openSettings = () => {
  setupStore.$reset()
  navigateTo("/setup/start")
}

const sortByOptions: Item[] = [
  { name: "Date Added", value: "date_added" },
  { name: "Stars", value: "stars" },
  { name: "Name", value: "name" },
  { name: "Score", value: "score" },
  { name: "Favorites", value: "favorites" },
  { name: "Year", value: "year" },
];

const orderOptions: Item[] = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" }
]

const { selected: sortBySelected } = useDropdown(sortByOptions, settingsStore.sortBy, (n) => { settingsStore.sortBy = n as SortBy; });
const { selected: orderSelected } = useDropdown(orderOptions, settingsStore.order, (n) => { settingsStore.order = n as Order; });

const filterOptions: Item[] = [
  { name: "Equal to", value: "e" },
  { name: "Not Equal to", value: "ne" },
  { name: "Greater then", value: "gt" },
  { name: "Smaller then", value: "st" },
]

const filterStarsOptions: Item[] = [
  { name: "All", value: null },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
]

const filterWatchedOptions: Item[] = [
  { name: "All", value: null },
  { name: "Watched", value: true },
  { name: "Not Watched", value: false },
]

const { selected: filterStarsTypeSelected } = useDropdown(filterOptions, settingsStore.filters.stars.type, (n) => { settingsStore.filters.stars.type = n as FilterType; });
const { selected: filterStarsSelected } = useDropdown(filterStarsOptions, settingsStore.filters.stars.value, (n) => { settingsStore.filters.stars.value = n as FilterValue<number>; });

const { selected: filterWatchedSelected } = useDropdown(filterWatchedOptions, settingsStore.filters.watched, (n) => { settingsStore.filters.watched = n as FilterValue<boolean>; });

const sortFilterModal = ref<InstanceType<typeof Modal> | null>(null);
const exportImportModal = ref<InstanceType<typeof Modal> | null>(null);

const openSortingFilterMenu = () => {
  if (!sortFilterModal.value) return;

  sortFilterModal.value.show()
}

const openExportImportMenu = () => {
  if (!exportImportModal.value) return;

  exportImportModal.value.show()
}

const exportImportSettings = ref({
  exportData: false,
  exportHidden: false,
  overrideData: false
})

const { $emitter, $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();
const setupStore = useSetupStore();
const router = useRouter()
const route = useRoute()

const input = ref<HTMLInputElement | null>(null)

const height = ref(60)

watch(height, (newHeight) => {
  document.documentElement.style.setProperty('--height', newHeight + 'px');
});

const mounted = ref(false);

const search = (event: Event) => {
  titlebarStore.setSearch((event.target as HTMLInputElement).value);
  if (route.path != '/') {
    router.replace({ path: '/' });
  }
}

const navigateHome = async () => {
  titlebarStore.setSearch('')

  if (route.path === '/') {
    await router.replace({ path: '/redirect' })
    await router.replace({ path: '/' })
  } else {
    await router.push('/')
  }
}
const add = async (event: KeyboardEvent) => {
  $emitter.emit('search');
}

const isMaximized = ref(false);

onMounted(async () => {
  mounted.value = true;

  const currentWindow = await getCurrentWindow();
  isMaximized.value = await currentWindow.isMaximized();

  currentWindow.listen('tauri://resize', async () => {
    isMaximized.value = await currentWindow.isMaximized();
  });

  window.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code == "KeyL") {
      if (!input.value) return;
      input.value.focus();
    }
  })

  document.documentElement.style.setProperty('--height', height.value + 'px');
})

async function importFile() {
  const selectedPath = await open({
    title: "Import Anime List",
    filters: [
      { name: "CSV File", extensions: ["csv"] }
    ],
  });

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

    await router.replace({ path: '/redirect' })
    await router.replace({ path: '/' })
  }

  if (!exportImportModal.value) return;
  exportImportModal.value.hide()
}

async function exportFile() {
  const selectedPath = await save({
    title: "Export Anime List",
    defaultPath: `a.ni.me_export_${Date.now().toString()}.csv`,
    filters: [
      { name: "CSV File", extensions: ["csv"] }
    ],
  });

  const animes = await $database.animesPlain();


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

  if (!exportImportModal.value) return;
  exportImportModal.value.hide()
}
</script>

<style lang="scss">
main {
  margin-top: var(--height, 60px);
  height: calc(100% - var(--height, 60px));
}

header.titlebar {
  display: flex;
  height: 60px;
  padding: 12px;
  padding-right: 13px;
  user-select: none;
  font-size: 20px;
  gap: 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 100vw;
  width: 100%;
  z-index: 1000;

  .data {
    display: flex;
    gap: 10px;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    min-width: 0;

    h3 {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      @extend %body1;
      padding: 6px;
      padding-inline: 12px;
      width: 100%;
      max-width: 500px;
      outline: none;
      border: 1px solid #ffffff10;
      border-radius: 4px;
      background-color: transparent;
      color: #ffffffaa;
    }
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: end;
    width: 100%;

    .control {
      z-index: 101;
    }
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 5px;

    .space {
      height: 20px;
      width: 1px;
      margin-inline: 10px;
      background-color: #ffffff20;
    }

    .wrapper {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      transition: .2s ease-in-out;
      border-radius: 100px;
      cursor: pointer;
      height: 36px;
      width: 36px;

      .icon {
        margin: 0;
        opacity: .8;
        color: white;
        text-decoration: none;
      }

      &:hover {
        background-color: #ffffff20;

        &.red {
          background-color: #ff888820;
        }
      }
    }
  }

  &.inSetup {
    grid-template-columns: 50% 50%;
    gap: 0;

    .data {
      padding-left: 10px;

      .icons {
        display: none;
      }
    }

    .input {
      display: none;
    }
  }

  .sortFilterModal {
    .rows {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 10px;
      min-width: 500px;
    }
  }

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

  .sortFilterModal,
  .exportImportModal {
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

  .disableOnModal {
    transition: opacity .2s ease-in-out;
  }
}

html:has(.modal.shown) {
  header.titlebar {
    .disableOnModal {
      pointer-events: none;
      opacity: .5;
    }
  }

  header.titlebar:has(.modal.shown) {
    .disableOnModal {
      pointer-events: none;
      opacity: 1;
    }
  }
}
</style>