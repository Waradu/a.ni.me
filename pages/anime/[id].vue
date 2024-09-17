<template>
  <main class="anime">
    <header v-if="anime">
      <div class="image">
        <img :src="anime.image" alt="">
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
        <div class="rating" @mouseleave="moving = false" >
          <template v-for="i in 5">
            <StarFilledIcon class="icon star" v-if="anime.stars >= i" 
              @mousedown="moving = true"
              @mousemove="move(i)"
              @mouseup="stars(anime.id, i);moving=false" />
            <StarIcon class="icon" v-else 
              @mousedown="moving = true" 
              @mousemove="move(i)"
              @mouseup="stars(anime.id, i);moving=false" />
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
import type { Modal } from '#build/components';
import type { Anime } from '~/types/anime';

const route = useRoute();
const error = useError()
const { $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const anime = ref<Anime>()
const moving = ref(false)
const down = ref(false)

const move = (i: number) => {
  if (moving.value && anime.value) anime.value.stars = i;
}

const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

const show = () => {
  if (!settingsModal.value) return;

  settingsModal.value.show()
}

onMounted(async () => {
  const getanime = await $database.anime(Number(route.params.id));

  if (!getanime) {
    error({
      statusCode: 500,
      message: 'Anime not found'
    })

    return
  }

  titlebarStore.setTitle(getanime.name)
  anime.value = getanime;
})

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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0px 5px 10px #00000010;
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
}
</style>