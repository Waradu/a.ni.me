<template>
  <UiButton
    text="Click to install"
    @click="install"
    secondary
    v-if="progress >= 0.99 && !downloading && updateAvailable"
    v-slot="props"
  >
    <IconCheck :class="props.class" />
  </UiButton>
  <UiButton
    :text="
      !downloading
        ? 'Check for updates'
        : `Downloading ${Math.round(progress * 100)}%`
    "
    @click="check"
    secondary
    :loading="pending || downloading"
    v-else
  />
</template>

<script lang="ts" setup>
const {
  updateAvailable,
  latestVersion,
  progress,
  error,
  pending,
  downloading,
  check,
  install,
} = useUpdater(false);
</script>
