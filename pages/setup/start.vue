<template>
  <div class="start">
    <img class="app-icon" src="/icon.png" alt="">
    <div class="group">
      <h1>Ready to set A • NI • ME up?</h1>
      <p>Good luck!</p>
    </div>
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
  setupStore.$reset();
  setupStore.inSetup = true;
}

if (setupStore.finished) {
  navigateTo("/setup/finish");
}
</script>

<style lang="scss">
.app-icon {
  width: 100px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    color: #ffffffaa;
  }
}
</style>