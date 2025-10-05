<template>
  <div
    class="relative flex size-8 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-neutral-700"
    :class="
      red ? 'hover:bg-red-400/20 hover:text-red-300' : 'hover:bg-neutral-700'
    "
  >
    <slot class="size-4" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ red?: boolean }>();
</script>
