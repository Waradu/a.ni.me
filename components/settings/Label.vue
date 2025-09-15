<template>
  <label
    :for="id"
    class="flex items-center justify-between cursor-pointer"
    :class="disabled ? 'pointer-events-none' : ''"
  >
    <div class="flex gap-2 items-center">
      <span :class="disabled ? 'opacity-40' : ''">{{ text }}</span>
      <div
        v-if="tag"
        class="text-[10px] flex items-center p-0.5 h-max px-2 select-none rounded-full bg-neutral-700 bg-opacity-50 border-[1px] border-neutral-600"
      >
        {{ tag }}
      </div>
    </div>
    <input type="checkbox" :id="id" v-model="model" hidden />
    <UiToggle v-model="model" :class="disabled ? 'opacity-40' : ''" />
  </label>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();

defineProps<{
  text: string;
  id: string;
  tag?: string;
  disabled?: boolean;
}>();
</script>
