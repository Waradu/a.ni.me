<template>
  <UiButton
    v-if="progress >= 0.99 && !downloading && updateAvailable"
    v-slot="props"
    text="Click to install"
    secondary
    @click="install"
  >
    <LucideCheck :class="props.class" />
  </UiButton>
  <UiButton
    v-else
    :text="
      !downloading
        ? 'Check for updates'
        : `Downloading ${Math.round(progress * 100)}%`
    "
    secondary
    :loading="pending || downloading"
    @click="check"
  />
</template>

<script lang="ts" setup>
import { LucideCheck } from "lucide-vue-next";

const { updateAvailable, progress, pending, downloading, check, install } =
  useUpdater(false);
</script>
