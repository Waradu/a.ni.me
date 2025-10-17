<template>
  <NuxtLink
    class="flex h-8 items-center justify-center px-3 pb-[1px] text-center text-neutral-200 transition duration-300 outline-none hover:text-white [&.router-link-active]:text-white"
    :href="href"
    :class="hidden ? 'pointer-events-none opacity-0 blur-sm' : ''"
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
