<template>
  <main class="anime">
    <header v-if="anime">
      <div class="image" @click="showImage">
        <img :src="image" alt="">
      </div>
      <div class="text">
        <div class="name">
          <h1 :title="anime.data.title_english || anime.data.title">
            {{ anime.data.title_english || anime.data.title }}
          </h1>
          <div class="airing">
            {{ anime.data.status }}
          </div>
          <div class="icons">
            <div class="wrapper">
              <OptionsIcon class="icon" />
            </div>
            <div class="wrapper red" @click="del(anime.id)">
              <DeleteIcon class="icon" />
            </div>
          </div>
        </div>
        <div class="description" @click="show">
          <p v-html="anime.data.synopsis.replace('[Written by MAL Rewrite]', '')"></p>
        </div>
        <div class="rating">
          <template v-for="i in 5">
            <StarFilledIcon class="icon star" v-if="anime.stars >= i" @mousedown.prevent="start(anime.id, i)"
              @mousemove.prevent="move(i)" @mouseup.prevent="stars(anime.id, i); moving = false" />
            <StarIcon class="icon" v-else @mousedown.prevent="start(anime.id, i)" @mousemove.prevent="move(i)"
              @mouseup.prevent="stars(anime.id, i); moving = false" />
          </template>
        </div>
        <div class="genres">
          <div class="genre" v-for="genre in anime.data.genres">
            {{ genre.name }}
          </div>
        </div>
      </div>
      <Modal header="Synopsis" ref="synopsisModal">
        <p v-html="anime.data.synopsis.replace('[Written by MAL Rewrite]', '')"></p>
      </Modal>
      <Modal header="Cover" ref="imageModal">
        <div class="big-image" ref="coverTilt">
          <ZoomImage :src="image" />
        </div>
        <p class="center">Click and Scroll to zoom</p>
      </Modal>
    </header>
    <div class="details" v-if="anime">
      <div class="detail">
        <div class="text">Score</div>
        <div class="data">{{ anime.data.score ? anime.data.score : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Scored By</div>
        <div class="data">{{ anime.data.scored_by ? anime.data.scored_by : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Favorites</div>
        <div class="data">{{ anime.data.favorites ? anime.data.favorites : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Episodes</div>
        <div class="data">{{ anime.data.episodes ? anime.data.episodes : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Rating</div>
        <div class="data">{{ anime.data.rating ? anime.data.rating : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Year</div>
        <div class="data">{{ anime.data.year ? anime.data.year : "N/A" }}</div>
      </div>
    </div>
    <div class="characters" ref="charactersContainer">
      <div class="character" v-for="character in characters" :key="character.character.mal_id">
        <img :src="character.character.images.jpg.large_image_url || character.character.images.jpg.image_url" alt="">
        <div class="name">{{ character.character.name }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import StarIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_regular.svg";
import StarFilledIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_filled.svg";
import ShareIcon from "~/node_modules/@fluentui/svg-icons/icons/share_28_regular.svg";
import DeleteIcon from "~/node_modules/@fluentui/svg-icons/icons/delete_32_regular.svg";
import OptionsIcon from "~/node_modules/@fluentui/svg-icons/icons/options_32_regular.svg";
import type { Modal } from '#build/components';
import VanillaTilt from 'vanilla-tilt'
import type { CombinedAnime } from "~/types/db";
import { AnimeClient, type AnimeCharacter } from '@tutkli/jikan-ts';

const route = useRoute();
const { $database } = useNuxtApp();

const animeClient = new AnimeClient();

const titlebarStore = useTitlebarStore();

titlebarStore.setBackLink('/')

const anime = ref<CombinedAnime>()
const characters = ref<AnimeCharacter[]>()
const moving = ref(false)

const image = computed(() => {
  if (!anime.value) return "";

  return anime.value.data.images.jpg.large_image_url || anime.value.data.images.jpg.image_url;
})

const coverTilt = ref(null)

const move = (i: number) => {
  if (moving.value && anime.value) anime.value.stars = i;
}

const del = async (id: number) => {
  await $database.delete(id);
  navigateTo("/");
}

const synopsisModal = ref<InstanceType<typeof Modal> | null>(null);
const imageModal = ref<InstanceType<typeof Modal> | null>(null);

const show = () => {
  if (!synopsisModal.value) return;

  synopsisModal.value.show()
}

const showImage = () => {
  if (!imageModal.value) return;

  imageModal.value.show()
}

const start = async (id: number, stars: number) => {
  moving.value = true;
}

const charactersContainer = ref<HTMLElement | null>(null)
let isDragging = ref(false)
let startX = 0
let scrollLeft = 0

const startDrag = (event: MouseEvent) => {
  event.preventDefault()
  isDragging.value = true
  startX = event.pageX - (charactersContainer.value?.offsetLeft ?? 0)
  scrollLeft = charactersContainer.value?.scrollLeft ?? 0
  charactersContainer.value?.classList.add("dragging")
}

const drag = (event: MouseEvent) => {
  if (!isDragging.value || !charactersContainer.value) return
  event.preventDefault()
  const x = event.pageX - (charactersContainer.value.offsetLeft ?? 0)
  const walk = (x - startX)
  charactersContainer.value.scrollLeft = scrollLeft - walk
}

const stopDrag = () => {
  isDragging.value = false
  charactersContainer.value?.classList.remove("dragging")
}

onMounted(async () => {
  if (charactersContainer.value) {
    charactersContainer.value.addEventListener('mousedown', startDrag)
    charactersContainer.value.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', stopDrag)
  }

  const getanime = await $database.anime(Number(route.params.id));

  if (!getanime) {
    return
  }

  titlebarStore.setTitle(getanime.data.title_english || getanime.data.title)
  anime.value = getanime;

  try {
    const chars = await animeClient.getAnimeCharacters(anime.value.data.mal_id);

    if (chars == undefined) {
      return [];
    }

    characters.value = chars.data;
  } catch (e) {
    console.log(e);
    return [];
  }
})

onBeforeUnmount(() => {
  if (charactersContainer.value) {
    charactersContainer.value.removeEventListener('mousedown', startDrag)
    charactersContainer.value.removeEventListener('mousemove', drag)
  }
  window.removeEventListener('mouseup', stopDrag)
})

watch(coverTilt, (newValue) => {
  if (newValue !== null && coverTilt.value) {
    VanillaTilt.init(coverTilt.value, {
      max: 5,
      speed: 1000,
      glare: true,
      "max-glare": 0.4
    })
  }
});

const stars = async (id: number, stars: number) => {
  if (!anime.value || !moving.value) return;

  if (anime.value.stars == stars) return;

  anime.value.stars = stars;

  await $database.stars(id, stars);
}
</script>

<style lang="scss">
main.anime {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  header {
    width: 100%;
    position: relative;
    display: flex;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 0;

    .image {
      aspect-ratio: 2 / 3;
      height: 300px;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0px 5px 10px #00000010;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        transition: .2s ease-in-out;
      }

      &:hover {
        img {
          scale: 1.2;
        }
      }
    }

    .text {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;

      .name {
        display: flex;
        gap: 10px;
        align-items: center;
        white-space: nowrap;
        width: 100%;
        min-width: 0;

        h1 {
          margin-left: 12px;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .airing {
          font-size: 12px;
          padding: 8px;
          padding-inline: 14px;
          border-radius: 40px;
          line-height: 1;
          background-color: #4e6e4e;
          white-space: nowrap;
        }

        .icons {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: auto;

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
              width: 20px;
              height: 20px;
            }

            &:hover {
              background-color: #ffffff20;
            }

            &.red {
              .icon {
                color: #ff9898;
              }

              &:hover {
                background-color: #ff888820;
              }
            }

            &.disabled {
              opacity: .5;
              pointer-events: none;
            }
          }
        }
      }

      .description {
        padding: 10px;
        padding-inline: 12px;
        transition: .2s ease-in-out;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;

        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 8;
          line-clamp: 8;
          -webkit-box-orient: vertical;
        }

        &:hover {
          background-color: #ffffff10;
        }
      }

      .rating {
        margin-left: 8px;
        display: flex;
        font-size: 32px;

        .icon {
          padding: 4px;
          cursor: pointer;
          transition: .1s ease-in-out;

          &.star {
            color: #E4E073;
          }
        }

        .icon:hover {
          scale: 1.1;
          transition: .1s ease-in-out;

          &~* {
            .icon {
              opacity: .2;
            }
          }
        }

        .icon:active {
          scale: 0.9;
        }
      }

      .genres {
        display: flex;
        gap: 10px;
        padding-inline: 14px;
        user-select: none;

        .genre {
          font-size: 14px;
          background-color: #ffffff10;
          border: 1px solid #ffffff20;
          color: #ffffffaa;
          padding: 2px;
          padding-inline: 10px;
          border-radius: 20px;
        }
      }
    }
  }

  .details {
    padding-inline: 80px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .detail {
      display: flex;
      width: max-content;
      padding: 20px;
      align-items: center;
      flex-direction: column;

      .text {
        font-size: 14px;
        color: #ffffff60;
        user-select: none;
      }

      .data {
        @extend %title3;
      }
    }
  }

  .characters {
    display: flex;
    padding: 20px;
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
    align-items: start;
    gap: 20px;
    padding-top: 0;
    user-select: none;
    cursor: grab;
    padding-inline: 80px;

    &.dragging {
      cursor: grabbing;
    }

    .character {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      min-width: 150px;
      max-width: 150px;
      align-items: center;
      text-align: center;

      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>