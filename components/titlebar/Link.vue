<template>
  <NuxtLink
    class="flex items-center justify-center h-8 px-3 pb-[1px] text-neutral-200 [&.router-link-active]:text-white hover:text-white transition duration-300 text-center"
    :href="href"
    :class="hidden ? 'blur-sm opacity-0 pointer-events-none' : ''"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  hidden: boolean;
}>();
</script>
