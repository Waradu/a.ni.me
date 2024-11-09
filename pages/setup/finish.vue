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
import JSConfetti from "js-confetti";

const setupStore = useSetupStore();
const settingsStore = useSettingsStore();
const { $database } = useNuxtApp();

onMounted(() => {
  if (setupStore.finished != true) {
    settingsStore.showNSFW = setupStore.showNSFW;
    settingsStore.tvAndMovieOnly = setupStore.tvAndMovieOnly;
    settingsStore.finishedIntroduction = true;

    setupStore.selectedAnimes.forEach(async anime => await $database.add(anime));

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 800,
    });
  }
  setupStore.finished = true;
  setupStore.inSetup = false;
});
</script>

<style lang="scss">
.finish {
  align-items: center;
}
</style>