<template>
  <div class="settings rows">
    <div class="item">
      <label for="showNSFW" class="text">Show NSFW <Info :text="nsfwInfoText"></Info></label>
      <label for="showNSFW" class="container">
        <input type="checkbox" name="showNSFW" id="showNSFW" v-model="settingsStore.showNSFW">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="item">
      <label for="tvAndMovieOnly" class="text">
        Only show anime shows and movies
        <Info :text="tvAndMovieInfoText"></Info>
        <div class="recommended">recommended</div>
      </label>
      <label for="tvAndMovieOnly" class="container">
        <input type="checkbox" name="tvAndMovieOnly" id="tvAndMovieOnly" v-model="settingsStore.tvAndMovieOnly">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="info" v-if="appData != ''">{{ appData }}</div>
  </div>
</template>

<script lang="ts" setup>
import { getVersion, getName, getTauriVersion } from "@tauri-apps/api/app";

const settingsStore = useSettingsStore();
const appData = ref("");

const nsfwInfoText = "Turning this on means you're okay with spicy content. If you'd rather keep things wholesome, just leave it off.";
const tvAndMovieInfoText = "Turning this on will show only the main anime series with episodes, skipping music and extras. Keeps your list neat and easy to track.";

onMounted(async () => {
  const version = await getVersion();
  const name = await getName();
  const tauriVersion = await getTauriVersion();

  const text = `${name}-${version} with tauri-${tauriVersion}`;

  appData.value = text;
});
</script>

<style lang="scss">
.settingsModal {
  .rows {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    min-width: 400px;

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
      height: max-content
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;

      .dropdowns {
        display: flex;
        gap: 10px;
      }

      .text {
        width: 100%;
        display: flex;
        gap: 10px;
        align-items: center;
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
        min-height: 25px;
        min-width: 25px;
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
    }
  }

  .info {
    font-size: 12px;
    color: #ffffff40;
    margin-top: 20px
  }
}
</style>