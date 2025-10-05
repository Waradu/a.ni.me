<template>
  <div class="flex justify-center p-8">
    <div v-if="anime" class="flex w-full flex-col gap-8">
      <header class="flex gap-6">
        <NuxtImg
          :src="anime.coverImage?.extraLarge ?? undefined"
          class="aspect-[2/3] h-80 w-48 rounded-md object-cover"
        />
        <div class="flex w-full flex-col gap-2">
          <div class="flex w-full items-center gap-3">
            <UiIcon
              v-slot="props"
              class="cursor-pointer"
              @click="navigateTo('/')"
            >
              <LucideArrowLeft :class="props.class" />
            </UiIcon>
            <h1 class="text-xl font-semibold">
              {{ anime.title?.userPreferred }}
            </h1>
            <div class="flex gap-1 select-none">
              <template v-for="link in anime.externalLinks?.slice(0, 4)">
                <div
                  v-if="link && link.url"
                  :key="link.id"
                  v-tippy="{ content: link.site }"
                  :style="{ '--color': link.color ?? '#ffffff20' }"
                  class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-[var(--color)]"
                  @click="openUrl(link.url)"
                >
                  <img
                    class="h-4 w-4"
                    :src="link.icon ?? '/globe.png'"
                    alt=""
                  />
                </div>
              </template>
            </div>
            <div class="ml-auto flex gap-1">
              <UiToggleIcon
                v-slot="props"
                v-model="anime.isFavourite"
                v-tippy="{
                  content: anime.isFavourite ? 'Favorite' : 'Not Favorite',
                }"
              >
                <LucideHeart
                  class="fill-current text-red-400"
                  :class="props.true"
                />
                <LucideHeart :class="props.false" />
              </UiToggleIcon>
              <UiToggleIcon
                v-slot="props"
                v-model="inLibrary"
                v-tippy="{
                  content: inLibrary ? 'In Library' : 'Not In Library',
                }"
              >
                <LucideCheck :class="props.true" />
                <LucideX :class="props.false" />
              </UiToggleIcon>
            </div>
          </div>
          <div
            v-if="anime.description"
            class="w-full cursor-pointer rounded-md p-2 px-3 transition-colors select-none hover:bg-neutral-700/50"
          >
            <p
              class="line-clamp-[8] w-full overflow-hidden"
              v-html="anime.description"
            ></p>
          </div>
          <div v-else class="-ml-3 w-full p-2 px-3 select-none">
            <p>No description found!</p>
          </div>
          <div class="mt-auto mb-2 flex gap-2 pl-3 select-none">
            <div
              v-for="genre in anime.genres"
              :key="genre!"
              class="rounded-md border border-neutral-700 bg-neutral-700/20 p-[3px] px-2 pb-1 text-xs text-neutral-200"
            >
              # {{ genre }}
            </div>
          </div>
        </div>
      </header>
      <div
        v-if="anime.characters"
        class="flex w-full gap-4 overflow-hidden overflow-x-scroll pb-2 select-none"
      >
        <template v-for="character in anime.characters.nodes">
          <div
            v-if="character"
            :key="character.id"
            class="flex flex-col items-center gap-1 text-center"
          >
            <NuxtImg
              :src="character.image?.large ?? undefined"
              class="max-h-40 min-h-40 max-w-28 min-w-28 rounded-md object-cover"
            />
            <div
              v-tippy="{ content: character.name?.userPreferred || 'No Name' }"
              class="max-w-28 overflow-hidden text-sm overflow-ellipsis whitespace-nowrap text-neutral-200"
            >
              {{ character.name?.userPreferred || "No Name" }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openUrl } from "@tauri-apps/plugin-opener";
import {
  LucideArrowLeft,
  LucideCheck,
  LucideHeart,
  LucideX,
} from "lucide-vue-next";
import { GetMediaByIdDocument } from "~/gql/gen/types.generated";

const route = useRoute();
const id = route.params.id as string;

const { $apollo } = useNuxtApp();
const { data: mediaItem } = useWhenAuthentificated(() =>
  $apollo.query(GetMediaByIdDocument, { mediaId: parseInt(id) }),
);

const anime = computed(() => mediaItem.value?.Media);

const inLibrary = ref(anime.value?.mediaListEntry != null);

watch(
  () => anime.value?.mediaListEntry,
  () => {
    inLibrary.value = anime.value?.mediaListEntry != null;
  },
);

const title = usePageScopedState("title");

watch(
  () => anime.value?.title?.userPreferred,
  () => {
    if (anime.value?.title?.userPreferred)
      title.value = anime.value.title.userPreferred;
  },
);

definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
