<template>
  <nav
    class="h-14 w-full flex justify-between p-3 select-none border-b-[1px] border-neutral-700"
    data-tauri-drag-region
  >
    <div class="w-[250px] px-2 flex items-center" data-tauri-drag-region>
      <h3 class="text-lg font-semibold" data-tauri-drag-region>Library</h3>
    </div>
    <TitlebarNavigation />
    <TitlebarControls />
  </nav>
</template>
