<template>
  <div class="dropdown" :class="{ closed: !open }">
    <div class="selected" @click="open = !open">
      <span class="text">{{ model.name }}</span>
      <ArrowIcon class="icon" />
    </div>
    <div class="items">
      <div class="item" v-for="item in items" :class="{ current: model.value == item.value }"
        @click="setSelected(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowIcon from "~/assets/svg/arrow.svg";
import type { Item } from "~/types/types";

const open = ref(false)

defineProps({
  items: {
    type: Array<Item>,
    required: true
  }
})

const model = defineModel<Item>({
  required: true
})

const setSelected = (item: Item) => {
  model.value = item;
  console.log(model.value);
  open.value = false;
  console.log(item);
}
</script>

<style lang="scss">
.dropdown {
  height: 34px;
  width: 150px;
  position: relative;

  .selected {
    border-radius: 4px;
    border: 1px solid #ffffff20;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 10px;
    cursor: pointer;
    color: #ffffffaa;
    transition: .2s ease-in-out;

    .icon {
      font-size: 12px;
      margin-bottom: 0;
      margin-top: 1px;
      transition: .2s ease-in-out;
      rotate: 180deg;
    }

    &:hover {
      background-color: #ffffff05;
      color: #ffffffdd;
    }
  }

  .items {
    position: absolute;
    z-index: 100;
    border-radius: 4px;
    border: 1px solid #ffffff20;
    width: 200px;
    margin-top: 5px;
    background-color: #111111;
    overflow: hidden;
    height: 200px;
    overflow-y: auto;
    transition: .2s ease-in-out;

    &::-webkit-scrollbar-track {
      margin-block: 0;
    }

    .item {
      padding: 8px;
      padding-inline: 12px;
      transition: .1s ease-in-out;
      cursor: pointer;

      &.current {
        color: #ffffffdd;
        background-color: #ffffff05;
      }

      &:hover {
        background-color: #ffffff10;
        color: #ffffffdd;
      }
    }
  }

  &.closed {
    .selected {
      .icon {
        rotate: 0deg;
      }
    }

    .items {
      height: 0px;
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>