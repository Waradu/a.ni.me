<template>
  <div
    :class="[
      'flex h-full items-center rounded-[5px] px-1.5 pb-[1px] whitespace-nowrap transition',
      disabled ? 'pointer-events-none' : '',
      error
        ? 'bg-red-400/10 text-red-400 hover:bg-red-400/20'
        : 'hover:bg-neutral-700/80',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
  error?: boolean;
}>();
</script>
