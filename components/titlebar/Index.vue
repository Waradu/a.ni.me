<template>
  <nav class="h-14 w-full flex justify-between p-3" data-tauri-drag-region>
    <div class="w-[250px] px-2 flex items-center" data-tauri-drag-region>
      <h3 class="text-lg font-semibold">Library</h3>
    </div>
    <div
      data-tauri-drag-region
      class="text-sm flex gap-2 items-center relative group"
      :class="{ searching: isSearching }"
    >
      <UiIcon v-slot="props" @click="isSearching = !isSearching">
        <IconSearch :class="props.class" />
      </UiIcon>
      <TitlebarLink class="w-[68px]" :hidden="isSearching" href="/">
        Library
      </TitlebarLink>
      <TitlebarLink class="w-[66px]" :hidden="isSearching" href="/search">
        Search
      </TitlebarLink>
      <TitlebarLink class="w-[76px]" :hidden="isSearching" href="/settings">
        Settings
      </TitlebarLink>
      <input
        type="text"
        class="absolute left-[34px] w-[calc(100%-44px)] bg-transparent outline-none h-full transition duration-150 ease-in-out mb-[1px]"
        :class="isSearching ? '' : 'blur-sm opacity-0 pointer-events-none'"
        placeholder="Search"
      />
      <div
        :class="[
          'absolute h-full top-0 bg-neutral-700 rounded-full transition-all duration-300 ease-in-out -z-10',
          isSearching
            ? ['left-0 w-full']
            : [
                'group-has-[a:nth-child(2).router-link-active]:w-[68px] group-has-[a:nth-child(2).router-link-active]:left-[40px]',
                'group-has-[a:nth-child(3).router-link-active]:w-[66px] group-has-[a:nth-child(3).router-link-active]:left-[116px]',
                'group-has-[a:nth-child(4).router-link-active]:w-[76px] group-has-[a:nth-child(4).router-link-active]:left-[190px]',
              ],
        ]"
      ></div>
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

<script lang="ts" setup>
const isSearching = ref(false);
</script>
