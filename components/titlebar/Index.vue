<template>
  <nav
    class="h-14 w-full flex justify-between p-3 select-none border-b-[1px] border-neutral-700"
    data-tauri-drag-region
  >
    <div class="w-52 pl-2 flex items-center" data-tauri-drag-region>
      <h3 class="text-lg w-full font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis" data-tauri-drag-region>
        {{ title }}
      </h3>
    </div>
    <TitlebarNavigation />
    <TitlebarControls />
  </nav>
</template>

<script lang="ts" setup>
const title = usePageScopedState("title");
</script>
