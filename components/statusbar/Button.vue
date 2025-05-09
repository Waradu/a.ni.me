<template>
  <div
    :class="[
      'flex items-center h-full px-1.5 pb-[1px] rounded-[4px] transition whitespace-nowrap',
      disabled ? 'pointer-events-none' : '',
      error
        ? 'bg-red-400 bg-opacity-10 text-red-400 hover:bg-red-400 hover:bg-opacity-20'
        : 'hover:bg-neutral-700 hover:bg-opacity-80',
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
