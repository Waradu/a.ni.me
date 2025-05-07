<template>
  <div
    :class="[
      'h-8 max-h-8 w-full flex items-center p-1 text-xs text-neutral-400 border-t-[1px] border-neutral-700 justify-between relative',
      downloading
        ? 'after:block after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:transition-[width] after:duration-100 after:ease-in-out after:w-[var(--progress)] after:h-[2px] after:bg-green-500'
        : '',
    ]"
    :style="{ '--progress': progress * 100 + '%' }"
  >
    <div class="w-48 flex h-full">
      <StatusbarButton @click="check">
        {{ appData }}
      </StatusbarButton>
    </div>
    <StatusbarButton v-if="error" @click="check">
      Update failed. Click here to try again.
    </StatusbarButton>
    <StatusbarButton disabled v-else-if="pending">
      Checking for updates
    </StatusbarButton>
    <StatusbarButton disabled v-else-if="downloading">
      Version {{ latestVersion }} found! Downloading {{ progress * 100 }}%
    </StatusbarButton>
    <StatusbarButton
      v-else-if="progress == 1 && !downloading && updateAvailable"
      @click="install"
    >
      Install update (requires restart of the app)
    </StatusbarButton>
    <div class="w-48 flex justify-end h-full">
      <StatusbarButton disabled> 12 / 64 </StatusbarButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { name, version, tauriVersion } = useVersion();
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

const appData = computed(
  () => `${name.value}-${version.value} with tauri-${tauriVersion.value}`
);
</script>
