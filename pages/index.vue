<template>
  <div class="flex flex-col gap-8 p-4">
    <div>Home</div>
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
