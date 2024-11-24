<template>
  <div class="toast" :class="{ hidden: !toaster.visible, red: toaster.color == 'red', green: toaster.color == 'green' }"
    @click="async (e) => {
      const close = await toaster.click(e);
      if (close) {
        toaster.visible = false;
      }
    }">
    {{ toaster.message }}
  </div>
</template>

<script lang="ts" setup>
const toaster = useToaster();
</script>

<style lang="scss">
.toast {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background-color: #181818;
  padding: 20px;
  padding-inline: 22px;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border: 1px solid #ffffff20;
  margin: 10px;
  transition: .2s ease-in-out;
  translate: 0 0;
  cursor: pointer;
  max-width: min(80%, 500px);

  &.hidden {
    opacity: 0;
    pointer-events: none;
    translate: 200px 0;
  }

  &.red {
    background-color: #351b1b;
    border-color: #c4454580;
  }

  &.green {
    background-color: #22351e;
    border-color: #41a75a80;
  }
}
</style>