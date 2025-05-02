<template>
  <NuxtLink
    class="flex items-center h-8 px-3 rounded-full [&.router-link-active]:bg-neutral-700 hover:bg-neutral-700 transition-colors duration-200 ease-in-out"
    :href="href"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: String,
});
</script>
