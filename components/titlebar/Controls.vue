<template>
  <div class="w-52 flex items-center justify-end gap-1" data-tauri-drag-region>
    <UiIcon v-slot="props" @click="() => getCurrentWindow().minimize()">
      <IconMinus :class="props.class" />
    </UiIcon>
    <UiToggleIcon
      v-slot="props"
      v-model="isMaximized"
      @click="() => getCurrentWindow().toggleMaximize()"
    >
      <IconMaximize :class="props.true" />
      <IconMinimize :class="props.false" />
    </UiToggleIcon>
    <UiIcon v-slot="props" @click="() => getCurrentWindow().close()" red>
      <IconX :class="props.class" />
    </UiIcon>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentWindow } from "@tauri-apps/api/window";

const isMaximized = ref(false);

onMounted(async () => {
  const currentWindow = await getCurrentWindow();
  isMaximized.value = await currentWindow.isMaximized();

  currentWindow.listen("tauri://resize", async () => {
    isMaximized.value = await currentWindow.isMaximized();
  });

  watch(isMaximized, () => {
    document.documentElement.classList.remove("maximized");
    if (isMaximized.value) document.documentElement.classList.add("maximized");
  });
});
</script>
