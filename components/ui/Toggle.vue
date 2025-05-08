<template>
  <div
    :class="[
      'w-10 h-6 rounded-full p-1 transition duration-200 ease-in-out',
      model ? 'bg-green-800' : 'bg-neutral-700',
    ]"
    @click.prevent="model = !model"
  >
    <div
      :class="[
        'aspect-square h-full rounded-full transition duration-200 ease-in-out',
        model ? 'translate-x-4 bg-green-400' : 'bg-neutral-500',
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();
</script>
