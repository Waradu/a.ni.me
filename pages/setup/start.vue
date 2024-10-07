<template>
  <div class="start">
    <h1>Ready to set A • NI • ME up?</h1>
    <p>Good luck!</p>
    <div class="navigation">
      <NuxtLink to="/setup/config">
        <button>Start
          <ArrowRightIcon />
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowRightIcon from "@fluentui/svg-icons/icons/arrow_right_32_filled.svg";

const setupStore = useSetupStore();

if (!setupStore.inSetup) {
  setupStore.$reset()
  setupStore.inSetup = true;
}

if (setupStore.finished) {
  navigateTo("/setup/finish")
}
</script>

<style lang="scss"></style>