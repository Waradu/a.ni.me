<template>
  <button
    class="relative flex h-8 w-max cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-700 px-4 text-sm text-neutral-200 transition-colors outline-none select-none hover:bg-neutral-700 hover:text-white"
    :class="[
      loading
        ? 'pointer-events-none animate-pulse bg-neutral-700 text-white'
        : '',
      secondary ? 'bg-neutral-700/50' : '',
      disabled ? 'pointer-events-none bg-neutral-700 opacity-50' : '',
    ]"
  >
    <span>{{ text }}</span>
    <slot v-if="!loading" class="size-4" />
    <LucideLoader2 v-else class="size-4 animate-spin" />
  </button>
</template>

<script lang="ts" setup>
import { LucideLoader2 } from "lucide-vue-next";

defineProps<{
  text: string;
  loading?: boolean;
  secondary?: boolean;
  disabled?: boolean;
}>();
</script>
