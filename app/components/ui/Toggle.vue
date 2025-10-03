<template>
  <div
    :class="[
      'h-6 w-10 rounded-full p-1 transition',
      model ? 'bg-green-800' : 'bg-neutral-700',
    ]"
    @click.prevent="model = !model"
  >
    <div
      :class="[
        'aspect-square h-full rounded-full transition',
        model ? 'translate-x-4 bg-green-400' : 'bg-neutral-500',
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();
</script>
