<template>
  <header class="titlebar">
    <div class="data">
      <div class="icons">
        <NuxtLink class="wrapper" :to="titlebarStore.getBackLink()" v-if="titlebarStore.getBackLink() != ''">
          <ArrowBackIcon class="icon" />
        </NuxtLink>
        <NuxtLink class="wrapper" to="/">
          <HomeIcon class="icon" />
        </NuxtLink>
      </div>
      <h3>
        {{ titlebarStore.getTitle() }}
      </h3>
    </div>
    <div class="controls">
      <div class="icons">
        <div class="wrapper">
          <SettingsIcon class="icon" @click="show" />
        </div>
      </div>
    </div>
    <Modal header="Settings" ref="settingsModal">
      <h1>Settings</h1>
    </Modal>
  </header>
</template>

<script lang="ts" setup>
import type { Modal } from "#build/components";
import ArrowBackIcon from "~/node_modules/@fluentui/svg-icons/icons/arrow_left_32_filled.svg";
import HomeIcon from "~/node_modules/@fluentui/svg-icons/icons/home_32_filled.svg";
import SettingsIcon from "~/node_modules/@fluentui/svg-icons/icons/settings_32_filled.svg";

const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

const show = () => {
  if (!settingsModal.value) return;

  settingsModal.value.show()
}

const titlebarStore = useTitlebarStore();
</script>

<style lang="scss">
header.titlebar {
  display: flex;
  height: 60px;
  padding: 20px;
  align-items: center;
  user-select: none;
  font-size: 20px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  .data {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .icons {
    display: flex;
    gap: 2px;

    .wrapper {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      transition: .2s ease-in-out;
      border-radius: 100px;
      cursor: pointer;
      height: 36px;
      width: 36px;

      .icon {
        margin: 0;
        opacity: .8;
        color: white;
        text-decoration: none;
      }

      &:hover {
        background-color: #ffffff20;
      }
    }
  }
}
</style>