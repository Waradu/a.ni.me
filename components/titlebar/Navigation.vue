<template>
  <div
    data-tauri-drag-region
    class="text-sm flex gap-2 items-center relative group"
    :class="{ searching: isSearching }"
  >
    <TitlebarLink
      v-for="page in pages"
      :href="page.href"
      :hidden="isSearching"
      :style="{ width: page.width + 'px' }"
    >
      {{ page.name }}
    </TitlebarLink>
    <UiToggleIcon v-slot="props" @click="toggleSearch()">
      <IconSearch :class="props.class" />
      <IconX :class="props.classSecond" />
    </UiToggleIcon>
    <input
      type="text"
      class="absolute left-3 w-[calc(100%-44px)] bg-transparent outline-none h-full transition duration-300 mb-[1px] placeholder:text-neutral-400"
      :class="isSearching ? '' : 'blur-sm opacity-0 pointer-events-none'"
      placeholder="Search"
      ref="searchbar"
      :disabled="!isSearching"
    />
    <div
      :class="[
        'absolute h-full top-0 bg-neutral-700 rounded-full transition-all duration-300 -z-10',
        isSearching
          ? ['left-0 w-[calc(100%-40px)]']
          : [
              'group-has-[a:nth-child(1).router-link-active]:w-[68px] group-has-[a:nth-child(1).router-link-active]:left-[0px]',
              'group-has-[a:nth-child(2).router-link-active]:w-[72px] group-has-[a:nth-child(2).router-link-active]:left-[76px]',
              'group-has-[a:nth-child(3).router-link-active]:w-[76px] group-has-[a:nth-child(3).router-link-active]:left-[156px]',
            ],
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { Key, useKeyboard } from "@waradu/keyboard";

const isSearching = ref(false);
const searchbar = ref<HTMLElement>();

const keyboard = useKeyboard();

keyboard.listen([Key.Control, Key.L], () => toggleSearch(true));

const toggleSearch = (force?: boolean) => {
  const newState = force ?? !isSearching.value;
  isSearching.value = newState;

  if (newState) {
    setTimeout(() => {
      searchbar.value?.focus();
    });
  }
};

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
];

onMounted(() => {
  keyboard.init();

  if (searchbar.value) {
    keyboard.listen(
      [Key.Escape],
      () => {
        toggleSearch(false);
      },
      { runIfFocused: searchbar.value }
    );

    keyboard.listen([Key.Enter], () => {}, { runIfFocused: searchbar.value });
  }
});
</script>
