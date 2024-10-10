<template>
  <header class="titlebar" :class="{ inSetup: setupStore.inSetup }" data-tauri-drag-region>
    <div class="data" data-tauri-drag-region>
      <div class="icons" data-tauri-drag-region>
        <NuxtLink class="wrapper" :to="titlebarStore.getBackLink()" v-if="mounted && titlebarStore.getBackLink() != ''">
          <ArrowBackIcon class="icon" />
        </NuxtLink>
        <NuxtLink :key="route.fullPath" class="wrapper" to="/" @click.prevent="navigateHome">
          <HomeIcon class="icon" />
        </NuxtLink>
      </div>
      <h3 :title="mounted ? titlebarStore.getTitle() : ''" data-tauri-drag-region v-if="mounted">
        {{ titlebarStore.getTitle() }}
      </h3>
    </div>
    <div class="input" data-tauri-drag-region>
      <input type="text" placeholder="Search" ref="input" :value="mounted ? titlebarStore.search : ''" @input="search"
        @keydown.enter="add" v-if="mounted">
    </div>
    <div class="controls" data-tauri-drag-region>
      <div class="icons" data-tauri-drag-region>
        <div class="wrapper" @click="openMenu">
          <FilterIcon class="icon" />
        </div>
        <div class="wrapper" @click="openSettings">
          <SettingsIcon class="icon" />
        </div>
        <div class="space" data-tauri-drag-region></div>
        <div class="wrapper" @click="async () => getCurrentWindow().minimize()">
          <MinimizeIcon class="icon" />
        </div>
        <div class="wrapper" v-if="isMaximized" @click="async () => getCurrentWindow().toggleMaximize()">
          <RestoreIcon class="icon" />
        </div>
        <div class="wrapper" v-else @click="async () => getCurrentWindow().toggleMaximize()">
          <MaximizeIcon class="icon" />
        </div>
        <div class="wrapper red" @click="() => getCurrentWindow().close()">
          <CloseIcon class="icon" />
        </div>
      </div>
      <Modal header="Sort & Filter" ref="sortFilterModal" class="sortFilterModal">
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
              <Dropdown :items="filterOptions" v-model="filterStarsTypeSelected"
                v-if="filterStarsSelected.value != null" />
              <Dropdown :items="filterStarsOptions" v-model="filterStarsSelected" />
            </div>
          </div>
          <div class="item">
            <span>Watched</span>
            <div class="dropdowns">
              <Dropdown :items="filterWatchedOptions" v-model="filterWatchedSelected" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </header>
</template>

<script lang="ts" setup>
import ArrowBackIcon from "@fluentui/svg-icons/icons/arrow_left_32_regular.svg";
import HomeIcon from "@fluentui/svg-icons/icons/home_32_regular.svg";
import SettingsIcon from "@fluentui/svg-icons/icons/settings_32_regular.svg";
import FilterIcon from "@fluentui/svg-icons/icons/filter_32_regular.svg";
import MaximizeIcon from "~/assets/svg/maximize.svg";
import MinimizeIcon from "~/assets/svg/minimize.svg";
import RestoreIcon from "~/assets/svg/restore.svg";
import CloseIcon from "~/assets/svg/close.svg";
import { getCurrentWindow } from "@tauri-apps/api/window";
import type { Modal } from "#build/components";
import type { Filter, FilterType, FilterValue, Item, ItemType, Order, SortBy } from "~/types/types";

const settingsStore = useSettingsStore();

const openSettings = () => {
  setupStore.$reset()
  navigateTo("/setup/start")
}

const sortByOptions: Item[] = [
  { name: "Year", value: "year" },
  { name: "Name", value: "name" },
  { name: "Score", value: "score" },
  { name: "Favorites", value: "favorites" },
  { name: "Episodes", value: "episodes" },
  { name: "Stars", value: "stars" },
];

const orderOptions: Item[] = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" }
]

const { selected: sortBySelected } = useDropdown(sortByOptions, settingsStore.sortBy, (n) => { settingsStore.sortBy = n as SortBy; });
const { selected: orderSelected } = useDropdown(orderOptions, settingsStore.order, (n) => { settingsStore.order = n as Order; });

const filterOptions: Item[] = [
  { name: "Equal", value: "e" },
  { name: "Not Equal", value: "eq" },
  { name: "Greater then", value: "gt" },
  { name: "Smaller then", value: "st" },
]

const filterStarsOptions: Item[] = [
  { name: "All", value: null },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
]

const filterWatchedOptions: Item[] = [
  { name: "All", value: null },
  { name: "Watched", value: true },
  { name: "Not Watched", value: false },
]

const { selected: filterStarsTypeSelected } = useDropdown(filterOptions, settingsStore.filters.stars.type, (n) => { settingsStore.filters.stars.type = n as FilterType; });
const { selected: filterStarsSelected } = useDropdown(filterStarsOptions, settingsStore.filters.stars.value, (n) => { settingsStore.filters.stars.value = n as FilterValue<number>; });

const { selected: filterWatchedSelected } = useDropdown(filterWatchedOptions, settingsStore.filters.watched, (n) => { settingsStore.filters.watched = n as FilterValue<boolean>; });

const sortFilterModal = ref<InstanceType<typeof Modal> | null>(null);

const openMenu = () => {
  if (!sortFilterModal.value) return;

  sortFilterModal.value.show()
}

const { $emitter } = useNuxtApp();

const titlebarStore = useTitlebarStore();
const setupStore = useSetupStore();
const router = useRouter()
const route = useRoute()

const input = ref<HTMLInputElement | null>(null)

const height = ref(60)

watch(height, (newHeight) => {
  document.documentElement.style.setProperty('--height', newHeight + 'px');
});

const mounted = ref(false);

const search = (event: Event) => {
  titlebarStore.setSearch((event.target as HTMLInputElement).value);
  if (route.path != '/') {
    router.replace({ path: '/' });
  }
}

const navigateHome = async () => {
  titlebarStore.setSearch('')

  if (route.path === '/') {
    await router.replace({ path: '/redirect' })
    await router.replace({ path: '/' })
  } else {
    await router.push('/')
  }
}
const add = async (event: KeyboardEvent) => {
  $emitter.emit('search');
}

const isMaximized = ref(false);

onMounted(async () => {
  mounted.value = true;

  const currentWindow = await getCurrentWindow();
  isMaximized.value = await currentWindow.isMaximized();

  currentWindow.listen('tauri://resize', async () => {
    isMaximized.value = await currentWindow.isMaximized();
  });

  window.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code == "KeyL") {
      if (!input.value) return;
      input.value.focus();
    }
  })

  document.documentElement.style.setProperty('--height', height.value + 'px');
})
</script>

<style lang="scss">
main {
  margin-top: var(--height, 60px);
  height: calc(100% - var(--height, 60px));
}

header.titlebar {
  display: grid;
  height: 60px;
  padding: 12px;
  padding-right: 13px;
  user-select: none;
  font-size: 20px;
  gap: 40px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 100vw;
  width: 100%;
  grid-template-columns: 30% calc(40% - 80px) 30%;
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
      @extend %body1;
      padding: 6px;
      padding-inline: 12px;
      width: 100%;
      max-width: 500px;
      min-width: 200px;
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
  }

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
      }
    }

    hr {
      margin: 20px;
      margin-inline: 0;
      background-color: #ffffff10;
      border: none;
      height: 2px;
      border-radius: 12px;
    }
  }
}
</style>