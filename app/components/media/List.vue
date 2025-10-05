<template>
  <div
    v-if="list"
    class="flex w-full flex-col transition-[margin-bottom]"
    :class="[
      collapsed ? '' : 'mb-3',
      filteredEntries.length == 0 ? 'pointer-events-none opacity-40' : '',
    ]"
  >
    <div
      class="mb-3 flex w-full cursor-pointer items-center gap-1 text-sm text-neutral-400 transition-colors select-none hover:text-white"
      @click="collapsed = !collapsed"
    >
      <LucideChevronDown
        class="size-4 transition-transform"
        :class="collapsed ? '-rotate-90' : ''"
      />
      <div class="flex w-full justify-between gap-1">
        <span>{{ list.name }}</span>
        <span v-if="searchStore.query" class="flex">
          <span>{{ filteredEntries.length }}</span>
          /
          <span>{{ list.entries?.length ?? 0 }}</span>
        </span>
        <span v-else>{{ filteredEntries.length }}</span>
      </div>
    </div>
    <Collapse
      :when="!collapsed"
      class="overflow-hidden pl-5 duration-[min(calc(var(--vc-auto-duration)_/_2),_1s)]"
    >
      <div
        v-if="filteredEntries"
        class="grid h-max w-full grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 pl-5 select-none"
      >
        <template v-for="entry in filteredEntries">
          <MediaItem v-if="entry" :key="entry.id" :entry="entry" />
        </template>
      </div>
    </Collapse>
  </div>
</template>

<script lang="ts" setup>
import { LucideChevronDown } from "lucide-vue-next";
import type { GetUserAnimeCollectionDocument } from "~/gql/gen/types.generated";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { Collapse } from "vue-collapsed";
import Fuse from "fuse.js";

const collapsed = ref(false);

const searchStore = useSearchStore();

type MediaListGroup = NonNullable<
  NonNullable<
    NonNullable<
      ResultOf<typeof GetUserAnimeCollectionDocument>["MediaListCollection"]
    >["lists"]
  >[number]
>;

const props = defineProps<{ list: MediaListGroup }>();

const filteredEntries = computed(() => {
  const entries =
    props.list.entries?.filter((e) => e?.media?.title?.userPreferred) ?? [];

  if (!searchStore.query) return entries;

  const fuse = new Fuse(entries, {
    keys: ["media.title.userPreferred"],
    threshold: 0.3,
  });

  return fuse.search(searchStore.query).map((r) => r.item);
});
</script>
