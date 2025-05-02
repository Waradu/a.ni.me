<template>
  <nav class="h-14 w-full flex justify-between p-3" data-tauri-drag-region>
    <div class="w-[250px] px-2 flex items-center" data-tauri-drag-region>
      <h3 class="text-lg font-semibold">Library</h3>
    </div>
    <div data-tauri-drag-region class="text-sm flex gap-2 items-center">
      <TitlebarLink href="/">Library</TitlebarLink>
      <TitlebarLink href="/search">Search</TitlebarLink>
      <TitlebarLink href="/settings">Settings</TitlebarLink>
      <UiIcon v-slot="props">
        <IconSearch :class="props.class" />
      </UiIcon>
    </div>
    <div
      class="w-[250px] flex items-center justify-end gap-1"
      data-tauri-drag-region
    >
      <UiIcon v-slot="props">
        <IconExternalLink :class="props.class" />
      </UiIcon>
      <UiIcon v-slot="props">
        <IconFilter :class="props.class" />
      </UiIcon>
      <div class="h-5 w-[1px] bg-white mx-2 opacity-20"></div>
      <UiIcon v-slot="props">
        <IconMinus :class="props.class" />
      </UiIcon>
      <UiIcon v-slot="props">
        <IconMaximize :class="props.class" />
      </UiIcon>
      <UiIcon v-slot="props">
        <IconX :class="props.class" />
      </UiIcon>
    </div>
  </nav>
</template>
