<template>
  <header class="titlebar" data-tauri-drag-region>
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
      <input type="text" placeholder="Search" ref="input" :value="mounted ? titlebarStore.search : ''"
        @input="search" @keydown.enter="add" v-if="mounted">
    </div>
    <div class="controls" data-tauri-drag-region>
      <div class="icons" data-tauri-drag-region>
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
    </div>
    <Modal header="Add anime" ref="modal" :onHide="() => { page = 0 }">
      <div class="anime" v-if="anime">
        <div class="image">
          <img :src="anime.images[Object.keys(anime.images)[0]].image_url" alt="Image">
        </div>
        <div class="text">
          <h2 class="name">{{ animeTitle }}</h2>
          <p class="desc">{{ anime.synopsis?.replace("[Written by MAL Rewrite]", "").trim() }}</p>
          <button class="add" @click="dbadd(anime)" :disabled="myanimenames.includes(animeTitle)">{{
            myanimenames.includes(animeTitle) ? "Already in Library" : "Add"
          }}</button>
        </div>
      </div>
      <div class="buttons">
        <button class="previous" @click="back" :disabled="page == 0">Back</button>
        <div class="progress" v-if="animes.length > 0">
          {{ page + 1 }}/{{ animes.length }}
        </div>
        <div class="progress" v-else>No results found</div>
        <button class="next" @click="next" :disabled="page == animes.length - 1">Next</button>
      </div>
    </Modal>
  </header>
</template>

<script lang="ts" setup>
import ArrowBackIcon from "@fluentui/svg-icons/icons/arrow_left_32_regular.svg";
import HomeIcon from "@fluentui/svg-icons/icons/home_32_regular.svg";
import SettingsIcon from "@fluentui/svg-icons/icons/settings_32_regular.svg";
import MaximizeIcon from "~/assets/svg/maximize.svg";
import MinimizeIcon from "~/assets/svg/minimize.svg";
import RestoreIcon from "~/assets/svg/restore.svg";
import CloseIcon from "~/assets/svg/close.svg";
import { getCurrentWindow } from "@tauri-apps/api/window";
import type { Response as JikanResponse, Data as JikanData } from "~/types/response";
import axios from "axios";
import type { Modal } from "#build/components";
import type { Anime } from "~/types/anime";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

const openSettings = () => {
  const webview = new WebviewWindow('confetti', {
    url: '/confetti',
    transparent: true,
    decorations: false,
    alwaysOnTop: true,
    focus: false,
    fullscreen: true,
    shadow: false,
    skipTaskbar: true,
  })
  webview.once('tauri://error', (e) => {
    console.error('Window error:', e)
  })
  /* webview.destroy() */
}

const { $database, $emitter } = useNuxtApp();

const modal = ref<InstanceType<typeof Modal> | null>(null)

const titlebarStore = useTitlebarStore();
const router = useRouter()
const route = useRoute()

const input = ref<HTMLInputElement | null>(null)

const height = ref(60)

watch(height, (newHeight) => {
  document.documentElement.style.setProperty('--height', newHeight + 'px');
});

const animes = ref<JikanData[]>([]);
const animeTitle = computed(() => {
  return anime.value.title.replaceAll("\"", "")
})
let lastAnime = "";
const myanimes = ref<Anime[]>([]);
const myanimenames = computed(() => {
  return myanimes.value.map((a) => a.name)
})

const mounted = ref(false);

const page = ref(0);
const anime = computed(() => {
  return animes.value[page.value];
})

const back = () => {
  page.value--;
  page.value = page.value < 0 ? 0 : page.value
}

const next = () => {
  page.value++;
  page.value = page.value > animes.value.length - 1 ? animes.value.length - 1 : page.value
}

const keyboard = useKeyboard()

keyboard.down("ArrowRight", next)
keyboard.down("ArrowLeft", back)
keyboard.down("Escape", () => {
  if (!modal.value) return;

  modal.value.hide()

  if (!input.value) return;

  input.value.focus()
})
keyboard.down("Enter", async () => {
  if (!(animes.value.length > 0) || !animes.value[page.value] || myanimenames.value.includes(animeTitle.value) || !modal.value || !modal.value.status()) return;

  if (lastAnime != animes.value[page.value].title) return;

  await dbadd(animes.value[page.value])

  if (!input.value) return;

  input.value.focus()
})

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

const dbadd = async (anime: JikanData) => {
  lastAnime = anime.title;
  await $database.add(anime)
  $emitter.emit('dataUpdated');

  if (!modal.value) return;
  modal.value.hide()
}

const isMaximized = ref(false);

onMounted(async () => {
  mounted.value = true;

  myanimes.value = await $database.animes();

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
    gap: 2px;

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

  button {
    border: none;
    background-color: transparent;
    padding: 10px;
    padding-inline: 20px;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;

    &[disabled] {
      opacity: .5;
      pointer-events: none;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .anime {
    display: flex;
    gap: 20px;

    .image {
      overflow: hidden;
      display: flex;
      width: 200px;
      aspect-ratio: 2 / 3;
      overflow: hidden;
      border-radius: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .text {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;

      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        line-clamp: 8;
        -webkit-box-orient: vertical;
        height: max-content;
      }

      .add {
        background-color: white;
        color: black;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    button {
      border: 1px solid #ffffff20;
    }
  }
}
</style>