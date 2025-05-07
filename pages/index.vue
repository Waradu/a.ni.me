<template>
  <div class="flex flex-col gap-8 p-4">
    <div class="text-red-400">Home</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
