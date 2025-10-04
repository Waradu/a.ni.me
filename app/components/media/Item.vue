<template>
  <div
    v-if="entry.media"
    class="flex w-[1fr] max-w-[260px] flex-col gap-1 text-center"
  >
    <NuxtLink
      :to="`/anime/${entry.media.id}`"
      class="group relative flex aspect-[2/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-200/20 transition select-none"
    >
      <LucideExternalLink
        class="absolute z-10 size-6 text-neutral-200 opacity-0 transition-[opacity] duration-300 group-hover:opacity-100"
      />
      <div class="absolute inset-0 z-0 h-full w-full bg-black transition">
        <NuxtImg
          :src="entry.media.coverImage?.extraLarge ?? undefined"
          alt="Cover"
          class="h-full w-full object-cover transition group-hover:scale-105 group-hover:opacity-40"
        />
      </div>
    </NuxtLink>
    <div class="flex w-full flex-col select-text">
      <span
        v-tippy="{ interactive: true }"
        class="overflow-hidden text-base overflow-ellipsis whitespace-nowrap text-neutral-200"
        :title="entry.media.title?.userPreferred || ''"
      >
        {{ entry.media.title?.userPreferred }}
      </span>
      <span class="text-xs text-neutral-400 capitalize whitespace-nowrap">
        <template v-if="entry.media.season && entry.media.seasonYear">
          {{ entry.media.season?.toLowerCase() }}
          {{ entry.media.seasonYear }}
        </template>
        <template v-else> Unknown Season </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LucideExternalLink } from "lucide-vue-next";
import type { GetUserAnimeCollectionDocument } from "~/gql/gen/types.generated";
import type { ResultOf } from "@graphql-typed-document-node/core";

type MediaListGroupEntries = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          ResultOf<typeof GetUserAnimeCollectionDocument>["MediaListCollection"]
        >["lists"]
      >[number]
    >["entries"]
  >[number]
>;

defineProps<{ entry: MediaListGroupEntries }>();
</script>
