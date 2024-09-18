<template>
  <main class="anime">
    <header v-if="anime">
      <div class="image" ref="tilt">
        <img :src="anime.image" alt="">
        <div class="overlay">
          <div class="wrapper">
            <OpenIcon class="icon" />
          </div>
          <div class="wrapper" @click="del(anime.id)">
            <DeleteIcon class="icon" />
          </div>
        </div>
      </div>
      <div class="text">
        <div class="name">
          <h1 :title="anime.name">
            {{ anime.name }}
          </h1>
          <div class="airing">
            {{ anime.status }}
          </div>
        </div>
        <div class="description" @click="show">
          <p v-html="anime.synopsis"></p>
        </div>
        <div class="rating">
          <template v-for="i in 5">
            <StarFilledIcon class="icon star" v-if="anime.stars >= i" @mousedown.prevent="moving = true"
              @mousemove.prevent="move(i)" @mouseup.prevent="stars(anime.id, i); moving = false" />
            <StarIcon class="icon" v-else @mousedown.prevent="moving = true" @mousemove.prevent="move(i)"
              @mouseup.prevent="stars(anime.id, i); moving = false" />
          </template>
        </div>
      </div>
      <Modal header="Description" ref="settingsModal">
        <p v-html="anime.synopsis"></p>
      </Modal>
    </header>
    <div class="details" v-if="anime">
      <div class="detail">
        <div class="text">Score</div>
        <div class="data">{{ anime.score }}</div>
      </div>
      <div class="detail">
        <div class="text">Scored By</div>
        <div class="data">{{ anime.scored_by }}</div>
      </div>
      <div class="detail">
        <div class="text">Favorites</div>
        <div class="data">{{ anime.favorites }}</div>
      </div>
      <div class="detail">
        <div class="text">Episodes</div>
        <div class="data">{{ anime.episodes }}</div>
      </div>
      <div class="detail">
        <div class="text">Rating</div>
        <div class="data">{{ anime.rating }}</div>
      </div>
      <div class="detail">
        <div class="text">Year</div>
        <div class="data">{{ anime.year }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import StarIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_regular.svg";
import StarFilledIcon from "~/node_modules/@fluentui/svg-icons/icons/star_32_filled.svg";
import OpenIcon from "~/node_modules/@fluentui/svg-icons/icons/open_32_regular.svg";
import DeleteIcon from "~/node_modules/@fluentui/svg-icons/icons/delete_32_regular.svg";
import type { Modal } from '#build/components';
import type { Anime } from '~/types/anime';
import VanillaTilt from 'vanilla-tilt'

const route = useRoute();
const error = useError()
const { $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const anime = ref<Anime>()
const moving = ref(false)

const tilt = ref(null)

const move = (i: number) => {
  if (moving.value && anime.value) anime.value.stars = i;
}

const del = async (id: number) => {
  await $database.delete(id);
  navigateTo("/");
}

const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

const show = () => {
  if (!settingsModal.value) return;

  settingsModal.value.show()
}

onMounted(async () => {
  const getanime = await $database.anime(Number(route.params.id));

  if (!getanime) {
    return
  }

  titlebarStore.setTitle(getanime.name)
  anime.value = getanime;
})

watch(tilt, (newValue) => {
  if (newValue !== null && tilt.value) {
    VanillaTilt.init(tilt.value, {
      max: 10,
      speed: 1000,
      glare: true,
      "max-glare": 0.2
    })
  }
});

const stars = async (id: number, stars: number) => {
  if (!anime.value || !moving.value) return;

  if (anime.value.stars == stars) return;

  await $database.stars(id, stars);

  anime.value.stars = stars;
}
</script>

<style lang="scss">
main.anime {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    position: relative;
    display: flex;
    padding: 40px;
    padding-top: 20px;

    .image {
      aspect-ratio: 2 / 3;
      height: 300px;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0px 5px 10px #00000010;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        transition: .2s ease-in-out;
      }

      .overlay {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: end;
        transition: .2s ease-in-out;
        opacity: 0;
        background-image: linear-gradient(to bottom, transparent, black);

        .wrapper {
          aspect-ratio: 1/1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: .2s ease-in-out;
          translate: 0 100%;

          .icon {
            filter: drop-shadow(0 0 10px #000000) drop-shadow(0 0 10px #000000) drop-shadow(0 0 10px #000000);
          }

          &:hover {
            background-color: #ffffff20;

            &:nth-child(2) {
              background-color: #ff666620;
              color: #ff6666aa;
            }
          }
        }
      }

      &:hover {
        .overlay {
          opacity: 1;

          .wrapper {
            translate: 0 0;
          }
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
      }

      .description {
        padding: 10px;
        padding-inline: 12px;
        transition: .2s ease-in-out;
        border-radius: 8px;
        cursor: pointer;

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
      }

      .data {
        @extend %title3;
      }
    }
  }
}
</style>