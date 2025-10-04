<template>
  <div
    data-tauri-drag-region
    class="group relative flex items-center gap-2 text-sm"
    :class="{ searching: isSearching }"
  >
    <TitlebarLink
      v-for="page in pages"
      :key="page.name"
      :href="page.href"
      :hidden="isSearching"
      :style="{ width: page.width + 'px' }"
    >
      {{ page.name }}
    </TitlebarLink>
    <UiToggleIcon v-slot="props" v-model="isSearching">
      <LucideSearch :class="props.true" />
      <LucideX :class="props.false" />
    </UiToggleIcon>
    <input
      ref="searchbar"
      v-model="searchStore.query"
      type="text"
      class="absolute left-3 mb-[1px] h-full w-[calc(100%-44px)] bg-transparent transition duration-300 outline-none placeholder:text-neutral-400"
      :class="isSearching ? '' : 'pointer-events-none opacity-0 blur-sm'"
      placeholder="Search"
      :disabled="!isSearching"
    />
    <div
      :class="[
        'absolute top-0 -z-10 h-full rounded-full bg-neutral-700 transition-all duration-300',
        isSearching
          ? ['left-0 w-[calc(100%-40px)]']
          : [
              'group-has-[a:nth-child(1).router-link-active]:left-[0px] group-has-[a:nth-child(1).router-link-active]:w-[68px]',
              'group-has-[a:nth-child(2).router-link-active]:left-[76px] group-has-[a:nth-child(2).router-link-active]:w-[72px]',
              'group-has-[a:nth-child(3).router-link-active]:left-[156px] group-has-[a:nth-child(3).router-link-active]:w-[76px]',
            ],
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { LucideSearch, LucideX } from "lucide-vue-next";

const isSearching = ref(false);
const searchbar = useTemplateRef("searchbar");

const searchStore = useSearchStore();

useKeybind({
  keys: ["no-macos:control_l", "macos:meta_l"],
  run: () => {
    if (isSearching.value) searchbar.value?.focus();
    isSearching.value = true;
  },
});

watch(isSearching, (newState) => {
  if (newState) {
    setTimeout(() => {
      searchbar.value?.focus();
    });
  } else {
    searchStore.query = "";
  }
});

const pages = [
  {
    name: "Library",
    href: "/",
    width: 68,
  },
  {
    name: "Explore",
    href: "/explore",
    width: 72,
  },
  {
    name: "Settings",
    href: "/settings",
    width: 76,
  },
] as const;

useKeybind({
  keys: ["control_1"],
  run: () => navigateTo(pages[0].href),
});
useKeybind({
  keys: ["control_2"],
  run: () => navigateTo(pages[1].href),
});
useKeybind({
  keys: ["control_3"],
  run: () => navigateTo(pages[2].href),
});

onMounted(() => {
  if (searchbar.value) {
    useKeybind({
      keys: ["escape"],
      run: () => {
        isSearching.value = false;
      },
      config: { runIfFocused: [searchbar.value] },
    });
  }
});
</script>
