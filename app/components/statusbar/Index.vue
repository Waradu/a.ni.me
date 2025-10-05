<template>
  <div
    :class="[
      'relative flex h-8 max-h-8 min-h-8 w-full items-center justify-between border-t border-neutral-700 p-1 text-xs text-neutral-400 select-none',
      downloading
        ? 'after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-[var(--progress)] after:bg-green-500 after:transition-[width] after:duration-100 after:content-[\'\']'
        : '',
    ]"
    :style="{ '--progress': progress * 100 + '%' }"
    data-tauri-drag-region
  >
    <div class="flex h-full max-w-0" data-tauri-drag-region>
      <StatusbarButton v-tippy title="Check for updates" @click="check">
        {{ appData }}
      </StatusbarButton>
    </div>
    <StatusbarButton v-if="error" error @click="check">
      Update failed. Click here to try again.
    </StatusbarButton>
    <StatusbarButton v-else-if="pending" disabled>
      Checking for updates
    </StatusbarButton>
    <StatusbarButton v-else-if="downloading" disabled>
      Downloading v{{ latestVersion }} - {{ Math.round(progress * 100) }}%
    </StatusbarButton>
    <StatusbarButton
      v-else-if="progress >= 0.99 && !downloading && updateAvailable"
      @click="install"
    >
      Click to install update (restart the app)
    </StatusbarButton>
    <div
      v-if="statusbar"
      class="flex h-full max-w-0 justify-end"
      data-tauri-drag-region
    >
      <StatusbarButton disabled> {{ statusbar }} </StatusbarButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { version, tauriVersion } = useVersion();
const {
  updateAvailable,
  latestVersion,
  progress,
  error,
  pending,
  downloading,
  check,
  install,
} = useUpdater();

const statusbar = usePageScopedState("statusbar");

const appData = computed(
  () =>
    `v${version.value} with tauri v${tauriVersion.value} ${
      import.meta.dev ? "- dev" : ""
    }`,
);
</script>
