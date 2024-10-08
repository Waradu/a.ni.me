<template>
  <div class="config">
    <h1>Set your preferences!</h1>
    <div class="settings">
      <div class="setting">
        <label for="nsfw" class="container">
          <input type="checkbox" name="nsfw" id="nsfw" v-model="setupStore.showNSFW">
          <span class="checkmark red"></span>
        </label>
        <label for="nsfw">Would you like to see NSFW content?</label>
        <Info :text="nsfwInfoText"></Info>
      </div>
      <div class="setting">
        <label for="tv" class="container">
          <input type="checkbox" name="tv" id="tv" v-model="setupStore.tvOnly">
          <span class="checkmark"></span>
        </label>
        <label for="tv">Show only anime shows (no movies or specials)</label>
        <Info :text="tvInfoText"></Info>
        <div class="recommended">recommended</div>
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
      accent-color: #385738;
      align-items: center;

      label {
        cursor: pointer;
      }

      .container {
        display: block;
        position: relative;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 25px;
        width: 25px;
        margin-top: 1px;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: #ffffff20;
          border-radius: 4px;
          transition: .2s ease-in-out;

          &:after {
            content: "";
            position: absolute;
            opacity: 0;
            transition: .2s ease-in-out;
            left: 9px;
            top: 5px;
            width: 4px;
            height: 9px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }

        &:has(:checked) {
          .checkmark {
            background-color: #4a794a80;

            &.red {
              background-color: #a0484880;
            }

            &:after {
              opacity: 1;
            }
          }
        }
      }

      &:hover {
        .checkmark {
          background-color: #ffffff40;
        }

        &:has(:checked) {
          .checkmark {
            background-color: #4a794add;

            &.red {
              background-color: #a04848dd;
            }
          }

        }
      }

      .recommended {
        text-transform: uppercase;
        font-size: 12px;
        background-color: #ffffff10;
        border: 1px solid #ffffff20;
        color: #ffffffaa;
        padding: 2px;
        padding-inline: 10px;
        border-radius: 20px;
        margin-top: 1px;
      }
    }
  }
}
</style>