<template>
  <div class="config">
    <h1>Set your preferences!</h1>
    <div class="settings">
      <div class="setting">
        <input type="checkbox" name="nsfw" id="nsfw" v-model="setupStore.showNSFW">
        <label for="nsfw">Would you like to see NSFW content?</label>
        <Info :text="nsfwInfoText"></Info>
      </div>
      <div class="setting">
        <input type="checkbox" name="tv" id="tv" v-model="setupStore.tvOnly">
        <label for="tv">Show only anime shows (no movies or specials) <span
            class="recommended">recommended</span></label>
        <Info :text="tvInfoText"></Info>
      </div>
    </div>
    <div class="navigation">
      <NuxtLink to="/setup/start">
        <button class="back">
          <ArrowLeftIcon />
        </button>
      </NuxtLink>
      <div class="step">
        1 / 2
      </div>
      <NuxtLink to="/setup/select">
        <button>Continue
          <ArrowRightIcon />
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowLeftIcon from "@fluentui/svg-icons/icons/arrow_left_32_filled.svg";
import ArrowRightIcon from "@fluentui/svg-icons/icons/arrow_right_32_filled.svg";

const setupStore = useSetupStore();

if (setupStore.finished) {
  navigateTo("/setup/finish")
}

const nsfwInfoText = "Turning this on means you're okay with spicy content. If you'd rather keep things wholesome, just leave it off."
const tvInfoText = "Turning this on will show only the main anime series with episodes, skipping movies and extras. Keeps your list neat and easy to track."
</script>

<style lang="scss">
.config {
  .settings {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .setting {
      display: flex;
      gap: 10px;
      user-select: none;
    }
  }
}
</style>