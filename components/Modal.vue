<template>
  <div class="modal" v-if="shown" :class="{ shown: actuallyShown }" @click="hide">
    <header class="min-titlebar" data-tauri-drag-region @click.stop></header>
    <div class="modal-wrapper" @click.stop>
      <div v-if="props.header" class="header">
        <h3>{{ props.header }}</h3>
        <div class="icons">
          <div class="wrapper" @click="hide">
            <DismissIcon class="icon" />
          </div>
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DismissIcon from "@fluentui/svg-icons/icons/dismiss_32_filled.svg";

const props = defineProps({
  header: {
    type: String,
    default: null,
  },
  onHide: {
    type: Function,
    default() {
      return () => { }
    },
  },
})

const shown = ref(false)
const actuallyShown = ref(false)

function show() {
  shown.value = true
  setTimeout(() => {
    actuallyShown.value = true
  }, 0)
}

function hide() {
  props.onHide()
  actuallyShown.value = false
  setTimeout(() => {
    shown.value = false
  }, 200)
}

defineExpose({
  show,
  hide,
})
</script>

<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  opacity: 0;
  transition: .2s ease-in-out;

  header.min-titlebar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
    z-index: 1;
  }

  .modal-wrapper {
    background-color: #111111;
    min-width: 400px;
    max-width: 600px;
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
    padding-left: 25px;
    border: 1px solid #ffffff10;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 2;

    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .content {
      @extend %text1;
      color: #ffffffaa;
    }
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

  &.shown {
    opacity: 1;
  }
}
</style>