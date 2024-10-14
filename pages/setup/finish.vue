<template>
  <div class="finish">
    <h1>Thanks for using A • NI • ME</h1>
    <div class="navigation">
      <NuxtLink to="/">
        <button>Finish
          <DoneIcon />
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DoneIcon from "@fluentui/svg-icons/icons/checkmark_32_filled.svg";

const setupStore = useSetupStore();
const settingsStore = useSettingsStore();

const { proxy } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    //@ts-ignore
    use: () => typeof window.JSConfetti !== 'undefined' && new window.JSConfetti()
  },
})

onMounted(() => {
  if (setupStore.finished != true) {
    settingsStore.showNSFW = setupStore.showNSFW
    settingsStore.tvAndMovieOnly = setupStore.tvAndMovieOnly
    proxy.addConfetti({
      confettiRadius: 6,
      confettiNumber: 800,
    })
  }
  setupStore.finished = true
  setupStore.inSetup = false
})
</script>

<style lang="scss">
.finish {
  align-items: center;
}
</style>