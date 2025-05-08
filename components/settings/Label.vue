<template>
  <label :for="id" class="flex items-center justify-between">
    <span>{{ text }}</span>
    <input type="checkbox" :id="id" v-model="model" hidden />
    <UiToggle v-model="model" />
  </label>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();

defineProps<{
  text: string;
  id: string;
}>();
</script>
