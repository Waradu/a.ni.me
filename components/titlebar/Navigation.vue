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
    <UiToggleIcon v-slot="props" @click="isSearching = !isSearching">
      <IconSearch :class="props.class" />
      <IconX :class="props.classSecond" />
    </UiToggleIcon>
    <input
      type="text"
      class="absolute left-3 w-[calc(100%-44px)] bg-transparent outline-none h-full transition duration-300 ease-in-out mb-[1px] placeholder:text-neutral-400"
      :class="isSearching ? '' : 'blur-sm opacity-0 pointer-events-none'"
      placeholder="Search"
    />
    <div
      :class="[
        'absolute h-full top-0 bg-neutral-700 rounded-full transition-all duration-300 ease-in-out -z-10',
        isSearching
          ? ['left-0 w-[calc(100%-40px)]']
          : [
              'group-has-[a:nth-child(1).router-link-active]:w-[68px] group-has-[a:nth-child(1).router-link-active]:left-[0px]',
              'group-has-[a:nth-child(2).router-link-active]:w-[66px] group-has-[a:nth-child(2).router-link-active]:left-[76px]',
              'group-has-[a:nth-child(3).router-link-active]:w-[76px] group-has-[a:nth-child(3).router-link-active]:left-[150px]',
            ],
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const isSearching = ref(false);

const pages = [
  {
    name: "Library",
    href: "/",
    width: 68,
  },
  {
    name: "Search",
    href: "/search",
    width: 66,
  },
  {
    name: "Settings",
    href: "/settings",
    width: 76,
  },
];
</script>
