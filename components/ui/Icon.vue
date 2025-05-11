<template>
  <div
    class="flex items-center justify-center transition-colors size-8 hover:bg-neutral-700 rounded-full text-neutral-200 relative"
    :class="red ? 'hover:bg-red-400 hover:bg-opacity-20 hover:text-red-300' : 'hover:bg-neutral-700'"
  >
    <slot class="size-4" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ red?: boolean }>();
</script>
