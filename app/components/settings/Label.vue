<template>
  <label
    :for="id"
    class="flex cursor-pointer items-center justify-between"
    :class="disabled ? 'pointer-events-none' : ''"
  >
    <div class="flex items-center gap-2">
      <span :class="disabled ? 'opacity-40' : ''">{{ text }}</span>
      <div
        v-if="tag"
        class="flex h-max items-center rounded-full border border-neutral-600 bg-neutral-700/50 p-0.5 px-2 text-[10px] select-none"
      >
        {{ tag }}
      </div>
    </div>
    <input :id="id" v-model="model" type="checkbox" hidden />
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
