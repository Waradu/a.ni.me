<template>
  <div class="controls" data-tauri-drag-region>
    <div class="icons" data-tauri-drag-region>
      <div class="wrapper disableOnModal" @click="search" title="Search for new animes" v-tippy>
        <SearchIcon class="icon" />
      </div>
      <div class="wrapper disableOnModal" @click="openExportImportMenu" title="Open export/import menu" v-tippy>
        <ArrowSwapIcon class="icon" />
      </div>
      <div class="wrapper disableOnModal" @click="openSortingFilterMenu" title="Open sorting/filter menu" v-tippy>
        <FilterIcon class="icon" />
      </div>
      <div class="wrapper disableOnModal" @click="openSettings" title="Open settings" v-tippy>
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
      <TitlebarModalsSortFilter />
    </Modal>
    <Modal header="Export & Import" ref="exportImportModal" class="exportImportModal">
      <TitlebarModalsExportImport :exportImportModal="exportImportModal" />
    </Modal>
    <Modal header="Settings" ref="settingsModal" class="settingsModal">
      <TitlebarModalsSettings />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import SettingsIcon from "@fluentui/svg-icons/icons/settings_32_regular.svg";
import SearchIcon from "@fluentui/svg-icons/icons/search_32_regular.svg";
import FilterIcon from "@fluentui/svg-icons/icons/filter_32_regular.svg";
import ArrowSwapIcon from "@fluentui/svg-icons/icons/arrow_swap_28_regular.svg";
import MaximizeIcon from "~/assets/svg/maximize.svg";
import MinimizeIcon from "~/assets/svg/minimize.svg";
import RestoreIcon from "~/assets/svg/restore.svg";
import CloseIcon from "~/assets/svg/close.svg";

import type { Modal } from "#components";
import { getCurrentWindow } from "@tauri-apps/api/window";

const sortFilterModal = ref<InstanceType<typeof Modal> | null>(null);
const exportImportModal = ref<InstanceType<typeof Modal> | null>(null);
const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

const openSortingFilterMenu = () => {
  if (!sortFilterModal.value) return;

  sortFilterModal.value.show();
};

const openExportImportMenu = () => {
  if (!exportImportModal.value) return;

  exportImportModal.value.show();
};

const openSettings = () => {
  if (!settingsModal.value) return;

  settingsModal.value.show();
};

const search = () => {
  navigateTo("/search");
};

const isMaximized = ref(false);

onMounted(async () => {
  const currentWindow = await getCurrentWindow();
  isMaximized.value = await currentWindow.isMaximized();

  currentWindow.listen('tauri://resize', async () => {
    isMaximized.value = await currentWindow.isMaximized();
  });
});
</script>

<style lang="scss">
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
</style>