<template>
  <div class="sorting rows">
    <div class="item">
      <span>Sort By</span>
      <Dropdown :items="sortByOptions" v-model="sortBySelected" />
    </div>
    <div class="item">
      <span>Order</span>
      <Dropdown :items="orderOptions" v-model="orderSelected" />
    </div>
  </div>
  <hr>
  <div class="filtering rows">
    <div class="item">
      <span>Stars</span>
      <div class="dropdowns">
        <Dropdown :items="filterOptions" v-model="filterStarsTypeSelected" v-if="filterStarsSelected.value != null" />
        <Dropdown :items="filterStarsOptions" v-model="filterStarsSelected" />
      </div>
    </div>
    <div class="item">
      <span>Watched</span>
      <div class="dropdowns">
        <Dropdown :items="filterWatchedOptions" v-model="filterWatchedSelected" />
      </div>
    </div>
    <div class="item">
      <label for="showHidden" class="text">Show hidden</label>
      <label for="showHidden" class="container">
        <input type="checkbox" name="showHidden" id="showHidden" v-model="settingsStore.filters.showHidden">
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Item } from "~/types/dropdown";
import type { SortBy, Order, FilterType, FilterValue } from "~/types/settings";
const settingsStore = useSettingsStore();

const sortByOptions: Item[] = [
  { name: "Date Added", value: "date_added" },
  { name: "Stars", value: "stars" },
  { name: "Name", value: "name" },
  { name: "Score", value: "averageScore" },
  { name: "Favourites", value: "favourites" },
  { name: "Year", value: "seasonYear" },
];

const orderOptions: Item[] = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" }
];

const { selected: sortBySelected } = useDropdown(sortByOptions, settingsStore.sortBy, (n) => { settingsStore.sortBy = n as SortBy; });
const { selected: orderSelected } = useDropdown(orderOptions, settingsStore.order, (n) => { settingsStore.order = n as Order; });

const filterOptions: Item[] = [
  { name: "Equal to", value: "e" },
  { name: "Not Equal to", value: "ne" },
  { name: "Greater then", value: "gt" },
  { name: "Smaller then", value: "st" },
];

const filterStarsOptions: Item[] = [
  { name: "All", value: null },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
];

const filterWatchedOptions: Item[] = [
  { name: "All", value: null },
  { name: "Watched", value: true },
  { name: "Not Watched", value: false },
];

const { selected: filterStarsTypeSelected } = useDropdown(filterOptions, settingsStore.filters.stars.type, (n) => { settingsStore.filters.stars.type = n as FilterType; });
const { selected: filterStarsSelected } = useDropdown(filterStarsOptions, settingsStore.filters.stars.value, (n) => { settingsStore.filters.stars.value = n as FilterValue<number>; });

const { selected: filterWatchedSelected } = useDropdown(filterWatchedOptions, settingsStore.filters.watched, (n) => { settingsStore.filters.watched = n as FilterValue<boolean>; });
</script>

<style lang="scss">
.sortFilterModal {
  .rows {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    min-width: 500px;

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
}
</style>