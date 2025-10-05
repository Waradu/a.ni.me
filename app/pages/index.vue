<template>
  <div
    class="flex w-full flex-col"
    :class="
      pending || !(!pending && lists && lists.length > 0)
        ? 'h-full overflow-hidden'
        : ''
    "
  >
    <FilterBasic />
    <UiError v-if="error">
      {{ error.statusCode }}:
      {{ error.message }}
    </UiError>
    <template v-else-if="pending || (!pending && lists && lists.length > 0)">
      <div v-if="!pending" class="flex w-full flex-col gap-3 p-3 pt-0">
        <template v-for="list in lists" :key="list!.name!">
          <MediaList v-if="list" :list="list" />
        </template>
      </div>
      <MediaSkelleton v-else />
    </template>
    <div
      v-else
      class="flex size-full cursor-default items-center justify-center text-neutral-400 select-none"
    >
      No lists found. Add animes to one of your lists on the
      <NuxtLink to="/explore" class="px-1 underline">explore</NuxtLink>
      page.
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fuse from "fuse.js";
import {
  GetUserAnimeCollectionDocument,
  type MediaListSort,
} from "~/gql/gen/types.generated";

const { $apollo } = useNuxtApp();

const filterStore = useFiltersStore();
const searchStore = useSearchStore();
const authStore = useAuthStore();

const {
  data: lists,
  error,
  pending,
} = useAsyncData(
  () =>
    `GetUserAnimeCollectionDocument:${authStore.user?.id}:${filterStore.sort}:${filterStore.desc}:${filterStore.status}`,
  async () => {
    if (!authStore.user?.id) return null;

    let sort = filterStore.sort;

    if (filterStore.desc && sort) {
      sort = (sort + "_DESC") as MediaListSort;
    }

    console.log(sort);
    console.log(filterStore.desc);
    console.log("Test");

    const data = await $apollo.query(GetUserAnimeCollectionDocument, {
      userId: authStore.user?.id,
      status: filterStore.status,
      sort: sort,
    });

    return data?.MediaListCollection?.lists;
  },
  {
    watch: [
      () => authStore.user,
      () => filterStore.sort,
      () => filterStore.desc,
      () => filterStore.status,
    ],
  },
);

const statusbarText = usePageScopedState("statusbar");

watch(
  [lists, () => searchStore.query],
  ([lists]) => {
    const entries = lists?.flatMap((list) => list?.entries);

    if (!entries) return;

    const fuse = new Fuse(entries, {
      keys: ["media.title.userPreferred"],
      threshold: 0.3,
    });

    const results = fuse.search(searchStore.query).map((r) => r.item);

    statusbarText.value =
      (searchStore.query
        ? `${results.length}/${entries.length}`
        : `${entries.length}`) + " Animes";
  },
  { immediate: true, deep: true },
);

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
