<template>
  <button class="cursor-default flex gap-2 items-center justify-center transition-colors duration-200 ease-in-out h-8 px-4 hover:bg-neutral-700 border-[1px] border-neutral-700 rounded-full text-neutral-200 hover:text-white relative text-sm">
    <span class="pb-0.5">{{ text }}</span>
    <slot class="size-4" />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ text: string }>();
</script>