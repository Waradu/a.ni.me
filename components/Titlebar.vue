<template>
  <header class="titlebar" :class="{ inSetup: setupStore.inSetup }" data-tauri-drag-region>
    <TitlebarData />
    <TitlebarInput />
    <TitlebarControls />
  </header>
</template>

<script lang="ts" setup>
const setupStore = useSetupStore();
</script>

<style lang="scss">
main {
  margin-top: 60px;
  height: calc(100% - 60px);
}

header.titlebar {
  display: flex;
  height: 60px;
  padding: 12px;
  padding-right: 13px;
  user-select: none;
  font-size: 20px;
  gap: 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 100vw;
  width: 100%;
  z-index: 1000;

  .icons {
    display: flex;
    align-items: center;
    gap: 5px;

    .space {
      height: 20px;
      width: 1px;
      margin-inline: 10px;
      background-color: #ffffff20;
    }

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

        &.red {
          background-color: #ff888820;
        }
      }
    }
  }

  &.inSetup {
    grid-template-columns: 50% 50%;
    gap: 0;

    .data {
      padding-left: 10px;

      .icons {
        display: none;
      }
    }

    .input {
      display: none;
    }

    .controls {

      .disableOnModal,
      .space {
        display: none;
      }
    }
  }

  .disableOnModal {
    transition: opacity .2s ease-in-out;
  }
}

html:has(.modal.shown) {
  header.titlebar {
    .disableOnModal {
      pointer-events: none;
      opacity: .5;
    }
  }

  header.titlebar:has(.modal.shown) {
    .disableOnModal {
      pointer-events: none;
      opacity: 1;
    }
  }
}
</style>