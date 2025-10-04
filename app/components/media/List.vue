<template>
  <div v-if="list" class="flex w-full flex-col transition-[margin-bottom]" :class="collapsed ? '' : 'mb-3'">
    <div
      class="flex mb-3 w-full cursor-pointer items-center gap-1 text-sm text-neutral-400 transition-colors select-none hover:text-white"
      @click="collapsed = !collapsed"
    >
      <LucideChevronDown
        class="size-4 transition-transform"
        :class="collapsed ? '-rotate-90' : ''"
      />
      <span>{{ list.name }}</span>
    </div>
    <Collapse
      :when="!collapsed"
      class="overflow-hidden pl-5 duration-[min(calc(var(--vc-auto-duration)_/_2),_1s)]"
    >
      <div
        class="grid h-max w-full grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 pl-5 select-none"
      >
        <template v-for="entry in list.entries">
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

const collapsed = ref(false);

type MediaListGroup = NonNullable<
  NonNullable<
    NonNullable<
      ResultOf<typeof GetUserAnimeCollectionDocument>["MediaListCollection"]
    >["lists"]
  >[number]
>;

defineProps<{ list: MediaListGroup }>();
</script>
