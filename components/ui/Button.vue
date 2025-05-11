<template>
  <button
    class="cursor-pointer flex gap-2 items-center justify-center transition-colors h-8 px-4 hover:bg-neutral-700 border-[1px] border-neutral-700 rounded-full text-neutral-200 hover:text-white relative text-sm w-max"
    :class="
      loading
        ? 'animate-pulse text-white bg-neutral-700 pointer-events-none'
        : ''
    "
  >
    <span>{{ text }}</span>
    <slot class="size-4" v-if="!loading" />
    <IconLoader2 class="size-4 animate-spin" v-else />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ text: string; loading?: boolean }>();
</script>
