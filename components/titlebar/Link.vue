<template>
  <NuxtLink
    class="flex items-center h-8 px-3 text-neutral-200 [&.router-link-active]:text-white hover:text-white transition duration-200 ease-in-out text-center"
    :href="href"
    :class="hidden ? 'blur-sm opacity-0 pointer-events-none' : ''"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  hidden: boolean;
}>();
</script>
