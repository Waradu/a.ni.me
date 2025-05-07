<template>
  <div
    :class="[
      'flex items-center h-full px-1.5 pb-[1px] rounded-[4px]',
      disabled
        ? ''
        : 'transition duration-200 ease-in-out hover:bg-neutral-700 hover:bg-opacity-80 cursor-pointer',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
}>();
</script>
