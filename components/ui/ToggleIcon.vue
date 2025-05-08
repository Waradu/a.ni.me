<template>
  <UiIcon v-slot="props" @click="model = !model">
    <slot
      :class="[
        props.class,
        'transition duration-300 ease-in-out absolute',
        !model ? 'scale-100 opacity-100 blur-0' : 'scale-0 opacity-0 blur-md',
      ]"
      :classSecond="[
        props.class,
        'transition duration-300 ease-in-out absolute',
        model ? 'scale-100 opacity-100 blur-0' : 'scale-0 opacity-0 blur-md',
      ]"
    />
  </UiIcon>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();
</script>
