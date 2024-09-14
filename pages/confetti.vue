<template>
</template>

<script lang="ts" setup>
import { getCurrentWindow } from "@tauri-apps/api/window";

definePageMeta({
  layout: false,
});

const { proxy } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    //@ts-ignore
    use: () => typeof window.JSConfetti !== 'undefined' && new window.JSConfetti()
  },
})

getCurrentWindow().setIgnoreCursorEvents(true)

onMounted(async () => {
  proxy.addConfetti({
    confettiRadius: 6,
    confettiNumber: 500,
  })

  setTimeout(() => {
    getCurrentWindow().close()
  }, 3000);
})
</script>