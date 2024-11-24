<template>
  <main class="anime" @mouseup.prevent="
  if (moving && databaseAnime) {
    stars(databaseAnime.stars);
    moving = false;
  }
    ">
    <header v-if="anime">
      <div class="image" @click="showImage">
        <img :src="image" alt="" />
      </div>
      <div class="text">
        <div class="name">
          <h1 :title="anime.title.english ?? anime.title.romaji ?? 'N/A'">
            {{ anime.title.english ?? anime.title.romaji ?? 'N/A' }}
          </h1>
          <div class="airing">
            {{ anime.status }}
          </div>
          <div class="icons" v-if="databaseAnime">
            <div class="wrapper eye" title="hide / show anime from list" :class="{ hidden: databaseAnime.is_hidden }"
              @click="hidden">
              <EyeIcon class="icon" />
              <EyeOffIcon class="icon off" />
            </div>
            <div class="wrapper red" @click="del">
              <DeleteIcon class="icon" />
            </div>
          </div>
        </div>
        <div class="description" @click="showDescription" v-if="anime.description">
          <p v-html="anime.description"></p>
        </div>
        <div class="description disabled" v-else>
          <p>No description found!</p>
        </div>
        <div class="rating" v-if="databaseAnime">
          <template v-for="i in 5">
            <StarFilledIcon class="icon star" v-if="databaseAnime.stars >= i" @mousedown.prevent="start()"
              @mousemove.prevent="move(i)" />
            <StarIcon class="icon" v-else @mousedown.prevent="start()" @mousemove.prevent="move(i)" />
          </template>
        </div>
        <div class="genres">
          <div class="genre" v-for="genre in anime.genres">
            {{ genre }}
          </div>
        </div>
      </div>
    </header>
    <div class="details" v-if="anime">
      <div class="detail">
        <div class="text">Average Score</div>
        <div class="data">
          {{ anime.averageScore ? anime.averageScore : "N/A" }}
        </div>
      </div>
      <div class="detail">
        <div class="text">Mean Score</div>
        <div class="data">{{ anime.meanScore ? anime.meanScore : "N/A" }}</div>
      </div>
      <div class="detail">
        <div class="text">Favourites</div>
        <div class="data">
          {{ anime.favourites ? anime.favourites : "N/A" }}
        </div>
      </div>
      <div class="detail">
        <div class="text">Popularity</div>
        <div class="data">
          {{ anime.popularity ? anime.popularity : "N/A" }}
        </div>
      </div>
      <div class="detail">
        <div class="text">Episodes</div>
        <div class="data">
          {{ anime.episodes ? anime.episodes : "N/A" }}
        </div>
      </div>
      <div class="detail">
        <div class="text">Season</div>
        <div class="data">
          {{
            anime.seasonYear
              ? anime.season
                ? anime.season + " " + anime.seasonYear
                : anime.seasonYear
              : "N/A"
          }}
        </div>
      </div>
    </div>
    <div class="characters" ref="charactersContainer">
      <div v-if="anime" class="character" v-for="character in anime.characters.nodes" :key="character.id">
        <img :src="character.image.url ?? '/transparent.png'" :alt="character.name.full ?? 'N/A'" />
        <div class="name">{{ character.name.full }}</div>
      </div>
    </div>
    <Modal header="Description" ref="synopsisModal" v-if="anime && anime.description">
      <p v-html="anime.description"></p>
    </Modal>
    <Modal header="Cover" ref="imageModal">
      <div class="big-image" ref="coverTilt">
        <ZoomImage :src="image" />
      </div>
      <p class="center">Click and Scroll to zoom</p>
    </Modal>
  </main>
</template>

<script lang="ts" setup>
import StarIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_regular.svg";
import StarFilledIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_filled.svg";
import DeleteIcon from "~/node_modules/@fluentui/svg-icons/icons/delete_32_regular.svg";
import EyeIcon from "~/node_modules/@fluentui/svg-icons/icons/eye_32_regular.svg";
import EyeOffIcon from "~/node_modules/@fluentui/svg-icons/icons/eye_off_32_regular.svg";
import type { Modal } from "#components";
import type { AnilistAnime } from "~/types/anilist";
import type { DbAnime } from "~/types/database";
import VanillaTilt from "vanilla-tilt";

const route = useRoute();
const id = Number(route.params.id);

const { $database, $api } = useNuxtApp();

const settingsStore = useSettingsStore();
const titlebarStore = useTitlebarStore();

titlebarStore.setBackLink("/");

const anime = ref<AnilistAnime>();
const databaseAnime = ref<DbAnime | null>(null);
const moving = ref(false);

const image = computed(() => {
  if (!anime.value) return "";

  return (
    (settingsStore.imageProxy ? settingsStore.imageProxy : "") +
    anime.value.coverImage.url
  );
});

const hidden = () => {
  if (!databaseAnime.value) return;

  databaseAnime.value.is_hidden = !databaseAnime.value.is_hidden;
  $database.hidden(databaseAnime.value.id, databaseAnime.value.is_hidden);
};

const coverTilt = ref(null);

const move = (i: number) => {
  if (moving.value && databaseAnime.value) databaseAnime.value.stars = i;
};

const stars = async (stars: number) => {
  if (!databaseAnime.value || !moving.value) return;

  databaseAnime.value.stars = stars;

  await $database.stars(id, stars);
};

const start = async () => {
  moving.value = true;
};

const del = async () => {
  await $database.delete(id);
  navigateTo("/");
};

const synopsisModal = ref<InstanceType<typeof Modal> | null>(null);
const imageModal = ref<InstanceType<typeof Modal> | null>(null);

const showDescription = () => {
  if (!synopsisModal.value) return;

  synopsisModal.value.show();
};

const showImage = () => {
  if (!imageModal.value) return;

  imageModal.value.show();
};

const charactersContainer = ref<HTMLElement | null>(null);
let isDragging = ref(false);
let startX = 0;
let scrollLeft = 0;

const startDrag = (event: MouseEvent) => {
  event.preventDefault();
  isDragging.value = true;
  startX = event.pageX - (charactersContainer.value?.offsetLeft ?? 0);
  scrollLeft = charactersContainer.value?.scrollLeft ?? 0;
  charactersContainer.value?.classList.add("dragging");
};

const drag = (event: MouseEvent) => {
  if (!isDragging.value || !charactersContainer.value) return;
  event.preventDefault();
  const x = event.pageX - (charactersContainer.value.offsetLeft ?? 0);
  const walk = x - startX;
  charactersContainer.value.scrollLeft = scrollLeft - walk;
};

const stopDrag = () => {
  isDragging.value = false;
  charactersContainer.value?.classList.remove("dragging");
};

const getAnime = await $api.anime(Number(id)).catch(async (e: any) => {
  if (e.message == "Not Found.") {
    await $database.delete(id);
  }
  await navigateTo("/");
});
if (getAnime) {
  anime.value = getAnime;
}

if (anime.value) {
  document.documentElement.style.setProperty('--bg-image', anime.value.bannerImage != "" ? `url(${anime.value.bannerImage})` : "");
}

onMounted(async () => {
  if (charactersContainer.value) {
    charactersContainer.value.addEventListener("mousedown", startDrag);
    charactersContainer.value.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", stopDrag);
  }

  if (!anime.value) return;

  const getDBAnime = await $database.anime(Number(id));
  databaseAnime.value = getDBAnime || null;

  titlebarStore.setTitle(
    anime.value.title.english || anime.value.title.romaji || "N/A"
  );
});

onBeforeUnmount(() => {
  if (charactersContainer.value) {
    charactersContainer.value.removeEventListener("mousedown", startDrag);
    charactersContainer.value.removeEventListener("mousemove", drag);
  }
  window.removeEventListener("mouseup", stopDrag);
});

watch(coverTilt, (newValue) => {
  if (newValue !== null && coverTilt.value) {
    VanillaTilt.init(coverTilt.value, {
      max: 5,
      speed: 1000,
      glare: true,
      "max-glare": 0.4,
    });
  }
});
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
      min-width: 200px;
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
        transition: 0.2s ease-in-out;
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
          font-size: 28px;
        }

        .airing {
          font-size: 12px;
          padding: 6px;
          padding-inline: 10px;
          border-radius: 40px;
          line-height: 1;
          background-color: #4e6e4e80;
          border: 1px solid #4e6e4e;
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
            transition: 0.2s ease-in-out;
            border-radius: 100px;
            cursor: pointer;
            height: 36px;
            width: 36px;

            .icon {
              margin: 0;
              opacity: 0.8;
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
              opacity: 0.5;
              pointer-events: none;
            }

            &.eye {
              position: relative;

              .icon {
                transition: 0.3s ease-in-out;
                position: absolute;

                scale: 1;
                opacity: 0.8;
                filter: blur(0);

                &.off {
                  scale: 0;
                  opacity: 0;
                  filter: blur(10px);
                }
              }

              &.hidden {
                .icon {
                  scale: 0;
                  opacity: 0;
                  filter: blur(10px);

                  &.off {
                    scale: 1;
                    opacity: 0.8;
                    filter: blur(0);
                  }
                }
              }
            }
          }
        }
      }

      .description {
        padding: 10px;
        padding-inline: 12px;
        transition: 0.2s ease-in-out;
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

        &.disabled {
          cursor: default;
          user-select: all;

          p {
            cursor: text;
            width: max-content;
          }

          &:hover {
            background-color: transparent;
          }
        }
      }

      .rating {
        margin-left: 8px;
        display: flex;
        font-size: 32px;

        .icon {
          padding: 4px;
          cursor: pointer;
          transition: 0.1s ease-in-out;

          &.star {
            color: #e4e073;
          }
        }

        .icon:hover {
          scale: 1.1;
          transition: 0.1s ease-in-out;

          &~* {
            .icon {
              opacity: 0.2;
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
        font-size: 24px;
        line-height: 32px;
        font-weight: 600;
        width: max-content;
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
    min-height: max-content;

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
