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
      </div>
      <Modal header="Settings" ref="settingsModal">
        <p v-html="anime.synopsis"></p>
      </Modal>
    </header>
  </main>
</template>

<script lang="ts" setup>
import type { Modal } from '#build/components';
import type { Anime } from '~/types/anime';

const route = useRoute();
const error = useError()
const { $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const anime = ref<Anime>()

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
      message: 'Custom error message'
    })

    return
  }

  titlebarStore.setTitle(getanime.name)
  anime.value = getanime;
})
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

    }

  }
}
</style>