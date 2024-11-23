<template>
  <header class="titlebar" :class="{ inSetup: setupStore.inSetup }" data-tauri-drag-region>

  </header>
</template>

<script lang="ts" setup>
const settingsStore = useSettingsStore();
const setupStore = useSetupStore();
</script>

<style lang="scss">
main {
  margin-top: var(--height, 60px);
  height: calc(100% - var(--height, 60px));
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

  .data {
    display: flex;
    gap: 10px;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    min-width: 0;

    h3 {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      padding: 6px;
      padding-inline: 12px;
      width: 100%;
      max-width: 500px;
      outline: none;
      border: 1px solid #ffffff10;
      border-radius: 4px;
      background-color: transparent;
      color: #ffffffaa;
    }
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: end;
    width: 100%;

    .control {
      z-index: 101;
    }
  }

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

  .sortFilterModal {
    .rows {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 10px;
      min-width: 500px;
    }
  }

  .exportImportModal {
    h3.sectionTitle {
      color: #ffffffcc;
    }

    .rows {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 10px;
      min-width: 400px;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
      }
    }

    .buttons {
      display: flex;
      gap: 20px;

      button {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        border: none;
        background-color: #ffffff40;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: .2s ease-in-out;
        outline: none;

        &:hover {
          background-color: #ffffff30;
        }
      }
    }
  }

  .sortFilterModal,
  .exportImportModal,
  .settingsModal {
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
    }

    .info {
      font-size: 12px;
      color: #ffffff40;
      margin-top: 20px
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