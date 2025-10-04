<template>
  <div
    class="flex w-full justify-center"
    :class="pending ? 'h-full overflow-hidden' : ''"
  >
    <UiError v-if="error">
      {{ error.statusCode }}:
      {{ error.message }}
    </UiError>
    <template v-else-if="pending || (!pending && lists && lists.length > 0)">
      <div
        v-if="!pending && lists && lists.length > 0"
        class="flex w-full flex-col gap-3 p-3"
      >
        <template v-for="list in lists" :key="list!.name!">
          <MediaList v-if="list" :list="list" />
        </template>
      </div>
      <div
        v-else
        class="grid h-max w-full grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 p-3 select-none"
        :class="pending ? 'pr-1' : 'pr-2'"
      >
        <MediaSkelleton />
      </div>
    </template>
    <div v-else class="p-3">No Animes Found</div>
  </div>
</template>

<script lang="ts" setup>
import { GetUserAnimeCollectionDocument } from "~/gql/gen/types.generated";

const { $apollo } = useNuxtApp();

const searchStore = useSearchStore();
const authStore = useAuthStore();

const {
  data: lists,
  error,
  pending,
} = useAsyncData(
  () => `GetUserAnimeCollectionDocument:${searchStore.query}`,
  async () => {
    const data = await $apollo.query(GetUserAnimeCollectionDocument, {
      userId: authStore.user?.id,
    });

    return data?.MediaListCollection?.lists;
  },
  {
    watch: [() => authStore.user, () => searchStore.query],
  },
);

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
